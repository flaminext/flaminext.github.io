# Telegram Webhook Handler

Handler untuk webhook Telegram yang memproses admin replies dan menyimpannya ke Appwrite database.

## Struktur File

- `telegram-webhook-fixed.js` - Source code utama
- `telegram-webhook.js` - File yang sudah di-bundle (generated)
- `telegram-webhook-bundle.js` - Backup bundle
- `telegram-webhook-simple.js` - Versi sederhana untuk testing
- `package.json` - Dependencies dan scripts

## Cara Penggunaan

### 1. Install Dependencies

```bash
cd telegram-webhook
npm install
```

### 2. Build Function

```bash
npm run build
```

### 3. Deploy ke Appwrite

```bash
npm run deploy
```

### 4. Test Function

```bash
npm run test
```

## Setup Telegram Webhook

1. Dapatkan Bot Token dari @BotFather
2. Set webhook URL ke Appwrite function:
   ```
   https://syd.cloud.appwrite.io/v1/functions/telegram-webhook/executions
   ```
   (Note: Untuk public webhook perlu setup khusus di Appwrite)

## Cara Kerja

1. Telegram mengirim update ke webhook
2. Function mendeteksi reply dari admin
3. Extract user ID dari format pesan: `🆔 **User ID:** abc123`
4. Simpan admin reply ke Appwrite database
5. Chat widget akan polling dan menampilkan admin reply

## Environment Variables

Function menggunakan hardcoded values untuk:

- Appwrite Endpoint: `https://syd.cloud.appwrite.io/v1`
- Project ID: `68fd7edd003351068add`
- Database ID: `68fd81e0001207ff305f`
- Collection: `message`
