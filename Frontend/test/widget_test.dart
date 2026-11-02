import 'package:flutter_test/flutter_test.dart';

import 'package:frontend/main.dart';

void main() {
  testWidgets('Aplikasi dibuka di halaman login', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());

    expect(find.text('Silakan Login'), findsOneWidget);
    expect(find.text('Login'), findsOneWidget);
  });
}
