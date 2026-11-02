import 'package:flutter/material.dart';

import '../models/siswa.dart';
import '../services/api_service.dart';
import '../widgets/siswa_form.dart';

class PageEdit extends StatelessWidget {
  final Siswa siswa;

  const PageEdit({super.key, required this.siswa});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Data Siswa'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: SiswaForm(
        awal: siswa,
        labelTombol: 'Simpan Perubahan',
        onSubmit: (data) async {
          await ApiService.ubahSiswa(siswa.id!, data);
          if (context.mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Data siswa berhasil diperbarui')),
            );
          }
        },
      ),
    );
  }
}
