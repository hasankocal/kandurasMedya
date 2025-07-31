<?php
// Contact Form Test Script
// Bu dosyayı kandurasmedya.com/test-contact-form.php olarak yükleyin

echo "<h2>Kanduras Medya Contact Form Test</h2>";

// Test data
$test_data = [
    'name' => 'Test Kullanıcı',
    'email' => 'test@example.com',
    'phone' => '+90 555 123 45 67',
    'subject' => 'Test Mesajı',
    'message' => 'Bu bir test mesajıdır. Contact form çalışıyor mu kontrol ediliyor.'
];

echo "<h3>Test Verileri:</h3>";
echo "<pre>" . print_r($test_data, true) . "</pre>";

// Send POST request to contact.php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://kandurasmedya.com/api/contact.php');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($test_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen(json_encode($test_data))
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "<h3>API Response:</h3>";
echo "<p><strong>HTTP Code:</strong> $http_code</p>";

if ($error) {
    echo "<p><strong>CURL Error:</strong> $error</p>";
}

if ($response) {
    echo "<p><strong>Response:</strong></p>";
    echo "<pre>" . htmlspecialchars($response) . "</pre>";
    
    $json_response = json_decode($response, true);
    if ($json_response) {
        if ($json_response['success']) {
            echo "<p style='color: green;'><strong>✅ Test BAŞARILI!</strong></p>";
            echo "<p>Email gönderildi: destek@kandurasmedya.com</p>";
        } else {
            echo "<p style='color: red;'><strong>❌ Test BAŞARISIZ!</strong></p>";
            echo "<p>Hata: " . htmlspecialchars($json_response['message']) . "</p>";
        }
    }
} else {
    echo "<p style='color: red;'><strong>❌ Response alınamadı!</strong></p>";
}

echo "<hr>";
echo "<h3>Troubleshooting:</h3>";
echo "<ul>";
echo "<li>✅ contact.php dosyası yüklendi mi?</li>";
echo "<li>✅ SMTP ayarları doğru mu?</li>";
echo "<li>✅ destek@kandurasmedya.com email hesabı var mı?</li>";
echo "<li>✅ PHP mail() fonksiyonu aktif mi?</li>";
echo "<li>✅ Server error logları kontrol edildi mi?</li>";
echo "</ul>";

echo "<p><strong>Manuel Test:</strong> <a href='https://kandurasmedya.com/contact' target='_blank'>Contact sayfasını ziyaret edin</a></p>";
?> 