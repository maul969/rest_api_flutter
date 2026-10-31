import 'package:flutter/material.dart';
import 'data_siswa.dart';

class PageEdit extends StatefulWidget {final Siswa siswa;
  const PageEdit({super.key,required this.siswa,});

  @override
  State<PageEdit> createState() => _PageEditState();
}

class _PageEditState extends State<PageEdit> {
  late TextEditingController nipdController;
  late TextEditingController namaController;
  late TextEditingController kelasController;
  late TextEditingController alamatController;

  @override
  void initState() {
    super.initState();

    nipdController = TextEditingController(text: widget.siswa.nipd,);
    namaController = TextEditingController(text: widget.siswa.nama,);
    kelasController = TextEditingController(text: widget.siswa.kelas,);
    alamatController = TextEditingController(text: widget.siswa.alamat,);
  }

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
      appBar: AppBar(title: const Text('Edit Data Siswa'), backgroundColor: Colors.blue, foregroundColor: Colors.white,),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            TextField(controller: nipdController, decoration: const InputDecoration( labelText: 'Nipd', border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 15),
            TextField(controller: namaController, decoration: const InputDecoration(labelText: 'Nama Siswa', border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 15),
            TextField(controller: kelasController, decoration: const InputDecoration(labelText: 'Kelas', border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 15),
            TextField(controller: alamatController, decoration: const InputDecoration(labelText: 'Alamat', border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 20),
            ElevatedButton(onPressed: simpan, child: const Text('Simpan Perubahan'),
            ),
          ],
        ),
      ),
    );
  }
}
