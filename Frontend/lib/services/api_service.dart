import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;

import '../config/api_config.dart';
import '../models/siswa.dart';

class ApiException implements Exception {
  final String message;
  final int? statusCode;

  ApiException(this.message, {this.statusCode});

  bool get sesiHabis => statusCode == 401;

  @override
  String toString() => message;
}

class ApiService {
  static String? _token;

  static bool get sudahLogin => _token != null;

  static void logout() => _token = null;

  static const Duration _timeout = Duration(seconds: 10);

  static Uri _uri(String path) => Uri.parse('${ApiConfig.baseUrl}$path');

  static Map<String, String> _headers({bool auth = true}) => {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        if (auth && _token != null) 'Authorization': 'Bearer $_token',
      };

  /// Menjalankan request dan menerjemahkan error jaringan / server
  /// menjadi ApiException dengan pesan yang mudah dibaca.
  static Future<dynamic> _kirim(Future<http.Response> Function() request) async {
    final http.Response response;
    try {
      response = await request().timeout(_timeout);
    } on TimeoutException {
      throw ApiException(
        'Server tidak merespons. Cek alamat API (${ApiConfig.baseUrl}) dan pastikan backend berjalan.',
      );
    } on http.ClientException {
      throw ApiException(
        'Tidak bisa terhubung ke server (${ApiConfig.baseUrl}). '
        'Pastikan backend menyala dan HP/emulator satu jaringan dengan laptop.',
      );
    }

    dynamic body;
    try {
      body = response.body.isEmpty ? null : jsonDecode(response.body);
    } catch (_) {
      body = null;
    }

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return body;
    }

    var pesan = 'Terjadi kesalahan (kode ${response.statusCode})';
    if (body is Map && body['message'] != null) {
      pesan = '${body['message']}';
    }
    if (response.statusCode == 401 && _token != null) {
      pesan = 'Sesi habis, silakan login ulang';
    }
    throw ApiException(pesan, statusCode: response.statusCode);
  }

  // ---------- Auth ----------

  static Future<void> login(String username, String password) async {
    final body = await _kirim(() => http.post(
          _uri('/api/auth/login'),
          headers: _headers(auth: false),
          body: jsonEncode({'username': username, 'password': password}),
        ));

    final token = body is Map ? body['token'] : null;
    if (token is! String || token.isEmpty) {
      throw ApiException('Respons login tidak valid dari server');
    }
    _token = token;
  }

  /// Daftar akun baru (publik, tidak butuh token).
  static Future<void> register(String username, String password) async {
    await _kirim(() => http.post(
          _uri('/api/auth/register'),
          headers: _headers(auth: false),
          body: jsonEncode({'username': username, 'password': password}),
        ));
  }

  // ---------- Siswa ----------

  static Future<List<Siswa>> getSiswa() async {
    final body = await _kirim(() => http.get(
          _uri('/api/siswa'),
          headers: _headers(),
        ));

    if (body is! List) {
      throw ApiException('Format data siswa dari server tidak sesuai');
    }
    return body
        .map((e) => Siswa.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  static Future<void> tambahSiswa(Siswa siswa) async {
    await _kirim(() => http.post(
          _uri('/api/siswa'),
          headers: _headers(),
          body: jsonEncode(siswa.toJson()),
        ));
  }

  static Future<void> ubahSiswa(int id, Siswa siswa) async {
    await _kirim(() => http.put(
          _uri('/api/siswa/$id'),
          headers: _headers(),
          body: jsonEncode(siswa.toJson()),
        ));
  }

  static Future<void> hapusSiswa(int id) async {
    await _kirim(() => http.delete(
          _uri('/api/siswa/$id'),
          headers: _headers(),
        ));
  }
}
