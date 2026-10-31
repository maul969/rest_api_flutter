import 'package:flutter/material.dart';
import 'dashboard.dart';

class PageLogin extends StatefulWidget {
  const PageLogin({super.key});

  @override
  State<PageLogin> createState() => _PageLoginState();
}

class _PageLoginState extends State<PageLogin> {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  void dispose() {
    usernameController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(25),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              
              Container( width: 100,height: 100, decoration: BoxDecoration( color: Colors.blue, borderRadius: BorderRadius.circular(50),
                ),
                child: const Icon( Icons.person, size: 65, color: Colors.white,
                ),
              ),

              const SizedBox(height: 20),
              const Text('Aplikasi Siswa', style: TextStyle( fontSize: 24, fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 10),
              const Text('Silakan Login'),
              const SizedBox(height: 30),
              TextField( controller: usernameController, decoration: const InputDecoration( labelText: 'Username', border: OutlineInputBorder(),
                ),
              ),

              const SizedBox(height: 15),
              TextField( controller: passwordController, obscureText: true, decoration: const InputDecoration(   labelText: 'Password', border: OutlineInputBorder(),
                ),
              ),

              const SizedBox(height: 25),
              SizedBox( width: double.infinity, height: 45, child: ElevatedButton( onPressed: () { Navigator.pushReplacement( context, MaterialPageRoute( builder: (context) => const DashboardPage(),
                      ),
                    );
                  },
                  child: const Text('Login'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
