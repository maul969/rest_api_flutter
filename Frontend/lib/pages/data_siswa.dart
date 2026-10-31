import 'package:flutter/material.dart';
import 'page_edit.dart';

class Siswa {
  String nipd;
  String nama;
  String kelas;
  String alamat;

  Siswa({
    required this.nipd,
    required this.nama,
    required this.kelas,
    required this.alamat,
  });
}

class DataSiswaPage extends StatefulWidget {
  const DataSiswaPage({super.key});

  @override
  State<DataSiswaPage> createState() => _DataSiswaPageState();
}

class _DataSiswaPageState extends State<DataSiswaPage> {
  final List<Siswa> siswaList = [
    Siswa(
      nipd: '1001',
      nama: 'Rey',
      kelas: 'XII RPL',
      alamat: 'ParungP',
    ),
    Siswa(
      nipd: '1002',
      nama: 'Maul',
      kelas: 'XII RPL',
      alamat: 'ParungP',
    ),
    Siswa(
      nipd: '1003',
      nama: 'Fiqih',
      kelas: 'XII RPL',
      alamat: 'ParungP',
    ),
  ];

  Future<void> editData(int index) async {final hasil = await Navigator.push<Siswa>(context, MaterialPageRoute(builder: (context) => PageEdit(siswa: siswaList[index],),),
    );

    if (hasil != null) {setState(() {siswaList[index] = hasil;});
    }
  }

  void hapusData(int index) {showDialog(context: context, builder: (context) => AlertDialog(title: const Text('Hapus Data'), content: const Text('Yakin ingin menghapus data siswa ini?',),
        actions: [TextButton(onPressed: () {Navigator.pop(context);},
            child: const Text('Batal'),
          ),
          TextButton(onPressed: () {setState(() {siswaList.removeAt(index);});
              Navigator.pop(context);
            },
            child: const Text('Hapus'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Data Siswa'), backgroundColor: Colors.blue, foregroundColor: Colors.white,),

      body: ListView.
      builder(itemCount: siswaList.length, itemBuilder: (context, index) {final siswa = siswaList[index];

          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 10,vertical: 5,),
            child: Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(siswa.nama, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.bold,),
                        ),
                      ),

                      IconButton(visualDensity: VisualDensity.compact, icon: const Icon(Icons.edit, color: Colors.blue, size: 21,),
                        onPressed: () {editData(index);},
                      ),
                      IconButton(visualDensity: VisualDensity.compact,icon: const Icon(Icons.delete, color: Colors.red, size: 21,),
                        onPressed: () {hapusData(index);},
                      ),
                    ],
                  ),

                  Text('Nipd: ${siswa.nipd}'),
                  Text('Kelas: ${siswa.kelas}'),
                  Text('Alamat: ${siswa.alamat}'),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
