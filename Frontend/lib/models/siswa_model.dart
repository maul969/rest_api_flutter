class Siswa {
  final int? id;
  final String nipd;
  final String namaLengkap;
  final String jenisKelamin;
  final String alamat;
  final String kelas;
  final String jurusan;

  const Siswa({
    this.id,
    required this.nipd,
    required this.namaLengkap,
    required this.jenisKelamin,
    required this.alamat,
    required this.kelas,
    required this.jurusan,
  });

  static const List<String> pilihanJenisKelamin = ['Laki-Laki', 'Perempuan'];
  static const List<String> pilihanKelas = ['10', '11', '12'];
  static const List<String> pilihanJurusan = ['RPL', 'TKJ', 'DKV', 'BIDI', 'AK'];

  factory Siswa.fromJson(Map<String, dynamic> json) {
    return Siswa(
      id: json['id'] is int ? json['id'] as int : int.tryParse('${json['id']}'),
      nipd: '${json['nipd'] ?? ''}',
      namaLengkap: '${json['nama_lengkap'] ?? ''}',
      jenisKelamin: '${json['jenis_kelamin'] ?? ''}',
      alamat: '${json['alamat'] ?? ''}',
      kelas: '${json['kelas'] ?? ''}',
      jurusan: '${json['jurusan'] ?? ''}',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'nipd': nipd,
      'nama_lengkap': namaLengkap,
      'jenis_kelamin': jenisKelamin,
      'alamat': alamat,
      'kelas': kelas,
      'jurusan': jurusan,
    };
  }
}