import 'package:flutter/material.dart';
import 'page_login.dart';
import 'data_siswa.dart';
import 'page_input.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar( title: const Text('Dashboard'), backgroundColor: Colors.blue, foregroundColor: Colors.white, actions: [ IconButton( icon: const Icon(Icons.logout), onPressed: () { Navigator.pushReplacement( context, MaterialPageRoute( builder: (context) => const PageLogin(),
                ),
              );
            },
          ),
        ],
      ),
      body: Padding( padding: const EdgeInsets.all(20), child: Column( crossAxisAlignment: CrossAxisAlignment.start, children: [ const Text( 'Selamat Datang', style: TextStyle( fontSize: 22, fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 10),
            const Text('Aplikasi Data Siswa'),
            const SizedBox(height: 25), SizedBox( width: double.infinity, child: ElevatedButton.icon( icon: const Icon(Icons.people), label: const Text('Data Siswa'), onPressed: () { Navigator.push( context, MaterialPageRoute( builder: (context) => const DataSiswaPage(),
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 10), SizedBox( width: double.infinity,child: ElevatedButton.icon( icon: const Icon(Icons.person_add), label: const Text('Input Data Siswa'), onPressed: () { Navigator.push( context, MaterialPageRoute( builder: (context) => const PageInput(),
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 10),

            SizedBox( width: double.infinity, child: ElevatedButton.icon( icon: const Icon(Icons.logout), label: const Text('Logout'), onPressed: () { Navigator.pushReplacement( context, MaterialPageRoute( builder: (context) => const PageLogin(),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
