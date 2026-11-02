/// Alamat backend.
///
/// - Emulator Android  : http://10.0.2.2:3000 (default di bawah)
/// - HP asli (Wi-Fi sama dengan laptop): http://IP_LAPTOP:3000
///   contoh: flutter run --dart-define=API_BASE_URL=http://192.168.1.10:3000
/// - Chrome / Windows desktop: http://localhost:3000
class ApiConfig {
  static const String baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://192.168.1.6:3000',
  );
}
