# 🧪 Postman Security Tests

## 1. Brute Force
- Repeated login attempts
- Expect 429 after threshold

## 2. Vault Tampering
- Modify ciphertext
- Expect 400 / authTag failure

## 3. JWT Tampering
- Modify token payload
- Expect 401

## 4. Payload Flood
- Send huge body
- Expect rejection

## 5. Unauthorized Access
- Remove token
- Expect 401
