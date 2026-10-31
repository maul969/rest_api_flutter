import 'package:flutter/material.dart';
import 'data_siswa.dart';

class PageInput extends StatefulWidget {
  const PageInput({super.key});

  @override
  State<PageInput> createState() => _PageInputState();
}

class _PageInputState extends State<PageInput> {
  final nipdController = TextEditingController();
  final namaController = TextEditingController();
  final kelasController = TextEditingController();
  final alamatController = TextEditingController();

  @override
  void dispose() {
    nipdController.dispose();
    namaController.dispose();
    kelasController.dispose();
    alamatController.dispose();
    super.dispose();
  }

  void simpan() {
    if (nipdController.text.isEmpty ||
        namaController.text.isEmpty ||
        kelasController.text.isEmpty ||
        alamatController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Semua data harus diisi')),
      );
      return;
    }

    final siswa = Siswa(
      nipd: nipdController.text,
      nama: namaController.text,
      kelas: kelasController.text,
      alamat: alamatController.text,
    );
    Navigator.pop(context, siswa);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Input Data Siswa'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            TextField( controller: nisController, decoration: const InputDecoration( labelText: 'Nipd', border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 15),
            TextField( controller: namaController, decoration: const InputDecoration( labelText: 'Nama Siswa', border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 15),
            TextField( controller: kelasController, decoration: const InputDecoration( labelText: 'Kelas', border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 15),
            TextField( controller: alamatController, decoration: const InputDecoration( labelText: 'Alamat', border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 20),
            ElevatedButton( onPressed: simpan, child: const Text('Simpan'),
            ),
          ],
        ),
      ),
    );
  }
}
