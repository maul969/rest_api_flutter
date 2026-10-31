import 'package:flutter/material.dart';
import 'data_siswa.dart';

class PageInput extends StatefulWidget {
  const PageInput({super.key});

  @override
  State<PageInput> createState() => _PageInputState();
}

class _PageInputState extends State<PageInput> {
  final formKey = GlobalKey<FormState>();
  final namaController = TextEditingController();
  final nipdController = TextEditingController();
  final kelasController = TextEditingController();
  final alamatController = TextEditingController();

  @override
  void dispose() {
    namaController.dispose();
    nipdController.dispose();
    kelasController.dispose();
    alamatController.dispose();
    super.dispose();
  }

  Widget input(String label, TextEditingController controller, IconData icon,) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: TextFormField(controller: controller, validator: (value) {
          if (value == null || value.trim().isEmpty) {
            return '$label wajib diisi';
          }
          return null;
        },
        decoration: InputDecoration(labelText: label, prefixIcon: Icon(icon), border: OutlineInputBorder(borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
    );
  }

  void simpan() {
    if (!formKey.currentState!.validate()) return;

    final siswa = Siswa(
      nama: namaController.text.trim(),
      nipd: nipdController.text.trim(),
      kelas: kelasController.text.trim(),
      alamat: alamatController.text.trim(),
    );

    Navigator.pop(context, siswa);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Tambah Data Siswa'),),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: formKey,
          child: Column(
            children: [
              const Icon(Icons.person_add_alt_1, size: 70, color: Colors.blue,
              ),

              const SizedBox(height: 25),
              input('Nama Lengkap', namaController, Icons.person),
              input('Nipd', nipdController, Icons.badge),
              input('Kelas', kelasController, Icons.school),
              input('Alamat', alamatController, Icons.location_on),

              SizedBox(width: double.infinity, height: 50, child: 
              ElevatedButton.icon(onPressed: simpan, icon: const Icon(Icons.save), label: const Text('Simpan Data'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
