import 'package:flutter/material.dart';

import '../models/siswa.dart';
import '../services/api_service.dart';
import 'page_edit.dart';
import 'page_input.dart';
import 'page_login.dart';

class DataSiswaPage extends StatefulWidget {
  const DataSiswaPage({super.key});

  @override
  State<DataSiswaPage> createState() => _DataSiswaPageState();
}

class _DataSiswaPageState extends State<DataSiswaPage> {
  List<Siswa> _siswaList = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _muatData();
  }

  void _kembaliKeLogin() {
    ApiService.logout();
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (_) => const PageLogin()),
      (_) => false,
    );
  }

  Future<void> _muatData() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await ApiService.getSiswa();
      if (!mounted) return;
      setState(() => _siswaList = data);
    } on ApiException catch (e) {
      if (!mounted) return;
      if (e.sesiHabis) return _kembaliKeLogin();
      setState(() => _error = e.message);
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _tambah() async {
    final berhasil = await Navigator.push<bool>(
      context,
      MaterialPageRoute(builder: (_) => const PageInput()),
    );
    if (berhasil == true) _muatData();
  }

  Future<void> _edit(Siswa siswa) async {
    final berhasil = await Navigator.push<bool>(
      context,
      MaterialPageRoute(builder: (_) => PageEdit(siswa: siswa)),
    );
    if (berhasil == true) _muatData();
  }

  Future<void> _hapus(Siswa siswa) async {
    final yakin = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Hapus Data'),
        content: Text('Yakin ingin menghapus data ${siswa.namaLengkap}?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Batal'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Hapus'),
          ),
        ],
      ),
    );
    if (yakin != true) return;

    try {
      await ApiService.hapusSiswa(siswa.id!);
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Data siswa berhasil dihapus')),
      );
      _muatData();
    } on ApiException catch (e) {
      if (!mounted) return;
      if (e.sesiHabis) return _kembaliKeLogin();
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.message)));
    }
  }

  Widget _isi() {
    if (_loading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_error != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.cloud_off, size: 56, color: Colors.grey),
              const SizedBox(height: 12),
              Text(_error!, textAlign: TextAlign.center),
              const SizedBox(height: 16),
              ElevatedButton.icon(
                onPressed: _muatData,
                icon: const Icon(Icons.refresh),
                label: const Text('Coba Lagi'),
              ),
            ],
          ),
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: _muatData,
      child: _siswaList.isEmpty
          ? ListView(
              children: const [
                SizedBox(height: 120),
                Center(child: Text('Belum ada data siswa')),
              ],
            )
          : ListView.builder(
              padding: const EdgeInsets.only(bottom: 80),
              itemCount: _siswaList.length,
              itemBuilder: (context, index) {
                final siswa = _siswaList[index];
                return Card(
                  margin:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  child: Padding(
                    padding: const EdgeInsets.all(10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                siswa.namaLengkap,
                                style: const TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            IconButton(
                              visualDensity: VisualDensity.compact,
                              tooltip: 'Edit',
                              icon: const Icon(Icons.edit,
                                  color: Colors.blue, size: 21),
                              onPressed: () => _edit(siswa),
                            ),
                            IconButton(
                              visualDensity: VisualDensity.compact,
                              tooltip: 'Hapus',
                              icon: const Icon(Icons.delete,
                                  color: Colors.red, size: 21),
                              onPressed: () => _hapus(siswa),
                            ),
                          ],
                        ),
                        Text('NIPD: ${siswa.nipd}'),
                        Text('Jenis Kelamin: ${siswa.jenisKelamin}'),
                        Text('Kelas: ${siswa.kelas} ${siswa.jurusan}'),
                        Text('Alamat: ${siswa.alamat}'),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Data Siswa'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: _isi(),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _tambah,
        icon: const Icon(Icons.person_add),
        label: const Text('Tambah'),
      ),
    );
  }
}
