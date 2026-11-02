import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../models/siswa.dart';
import '../services/api_service.dart';

/// Form dipakai bersama oleh halaman Tambah dan Edit.
/// [onSubmit] dipanggil dengan data dari form; jika berhasil (tidak melempar
/// error) halaman akan ditutup dengan hasil `true`.
class SiswaForm extends StatefulWidget {
  final Siswa? awal;
  final String labelTombol;
  final Future<void> Function(Siswa siswa) onSubmit;

  const SiswaForm({
    super.key,
    this.awal,
    required this.labelTombol,
    required this.onSubmit,
  });

  @override
  State<SiswaForm> createState() => _SiswaFormState();
}

class _SiswaFormState extends State<SiswaForm> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _nipd;
  late final TextEditingController _nama;
  late final TextEditingController _alamat;
  String? _jenisKelamin;
  String? _kelas;
  String? _jurusan;
  bool _menyimpan = false;

  @override
  void initState() {
    super.initState();
    final s = widget.awal;
    _nipd = TextEditingController(text: s?.nipd ?? '');
    _nama = TextEditingController(text: s?.namaLengkap ?? '');
    _alamat = TextEditingController(text: s?.alamat ?? '');
    _jenisKelamin = Siswa.pilihanJenisKelamin.contains(s?.jenisKelamin)
        ? s!.jenisKelamin
        : null;
    _kelas = Siswa.pilihanKelas.contains(s?.kelas) ? s!.kelas : null;
    _jurusan = Siswa.pilihanJurusan.contains(s?.jurusan) ? s!.jurusan : null;
  }

  @override
  void dispose() {
    _nipd.dispose();
    _nama.dispose();
    _alamat.dispose();
    super.dispose();
  }

  String? _wajib(String label, String? v) =>
      (v == null || v.trim().isEmpty) ? '$label wajib diisi' : null;

  Future<void> _simpan() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _menyimpan = true);
    try {
      await widget.onSubmit(Siswa(
        id: widget.awal?.id,
        nipd: _nipd.text.trim(),
        namaLengkap: _nama.text.trim(),
        jenisKelamin: _jenisKelamin!,
        alamat: _alamat.text.trim(),
        kelas: _kelas!,
        jurusan: _jurusan!,
      ));
      if (!mounted) return;
      Navigator.pop(context, true);
    } on ApiException catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.message)));
    } finally {
      if (mounted) setState(() => _menyimpan = false);
    }
  }

  Widget _dropdown(
    String label,
    IconData icon,
    List<String> pilihan,
    String? nilai,
    ValueChanged<String?> onChanged,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: DropdownButtonFormField<String>(
        initialValue: nilai,
        items: pilihan
            .map((e) => DropdownMenuItem(value: e, child: Text(e)))
            .toList(),
        onChanged: _menyimpan ? null : onChanged,
        validator: (v) => v == null ? '$label wajib dipilih' : null,
        decoration: InputDecoration(
          labelText: label,
          prefixIcon: Icon(icon),
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        ),
      ),
    );
  }

  Widget _teks(
    String label,
    IconData icon,
    TextEditingController c, {
    TextInputType? keyboard,
    List<TextInputFormatter>? formatters,
    int? maxLength,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: TextFormField(
        controller: c,
        enabled: !_menyimpan,
        keyboardType: keyboard,
        inputFormatters: formatters,
        maxLength: maxLength,
        validator: (v) => _wajib(label, v),
        decoration: InputDecoration(
          labelText: label,
          prefixIcon: Icon(icon),
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Form(
        key: _formKey,
        child: Column(
          children: [
            _teks(
              'NIPD',
              Icons.badge,
              _nipd,
              keyboard: TextInputType.number,
              formatters: [FilteringTextInputFormatter.digitsOnly],
              maxLength: 10,
            ),
            _teks('Nama Lengkap', Icons.person, _nama, maxLength: 50),
            _dropdown('Jenis Kelamin', Icons.wc, Siswa.pilihanJenisKelamin,
                _jenisKelamin, (v) => setState(() => _jenisKelamin = v)),
            _teks('Alamat', Icons.location_on, _alamat, maxLength: 50),
            _dropdown('Kelas', Icons.school, Siswa.pilihanKelas, _kelas,
                (v) => setState(() => _kelas = v)),
            _dropdown('Jurusan', Icons.computer, Siswa.pilihanJurusan,
                _jurusan, (v) => setState(() => _jurusan = v)),
            const SizedBox(height: 8),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton.icon(
                onPressed: _menyimpan ? null : _simpan,
                icon: _menyimpan
                    ? const SizedBox(
                        width: 18,
                        height: 18,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.save),
                label: Text(_menyimpan ? 'Menyimpan...' : widget.labelTombol),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
