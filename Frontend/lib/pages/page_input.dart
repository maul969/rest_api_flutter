import 'package:flutter/material.dart';

import '../services/api_service.dart';
import '../widgets/siswa_form.dart';

class PageInput extends StatelessWidget {
  const PageInput({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tambah Data Siswa'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: SiswaForm(
        labelTombol: 'Simpan Data',
        onSubmit: (siswa) async {
          await ApiService.tambahSiswa(siswa);
          if (context.mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Data siswa berhasil ditambahkan')),
            );
          }
        },
      ),
    );
  }
}
