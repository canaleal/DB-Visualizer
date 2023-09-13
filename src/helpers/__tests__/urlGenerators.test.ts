// tests/base64.spec.ts
import { test, expect } from 'vitest';
import { toUrlSafeB64, fromUrlSafeB64 } from "../urlGenerators"; // Update the import based on your actual file path

test('toUrlSafeB64 converts string to URL-safe Base64', () => {
  const originalString = "Hello+World/123";
  const encodedString = toUrlSafeB64(originalString);
  
  // Check that the string is converted to Base64
  // and is URL safe (i.e., '+' should be replaced by '-' and '/' should be replaced by '_')
  expect(encodedString).toBe("SGVsbG8rV29ybGQvMTIz".replace(/\//g, "_").replace(/\+/g, "-"));
});

test('fromUrlSafeB64 converts URL-safe Base64 to original string', () => {
  const urlSafeB64String = "SGVsbG8rV29ybGQvMTIz".replace(/\//g, "_").replace(/\+/g, "-");
  const decodedString = fromUrlSafeB64(urlSafeB64String);
  
  // Check that the URL-safe Base64 string is decoded to its original form
  expect(decodedString).toBe("Hello+World/123");
});

test('toUrlSafeB64 and fromUrlSafeB64 are reversible', () => {
  const originalString = "Hello+World/123";
  const encodedString = toUrlSafeB64(originalString);
  const decodedString = fromUrlSafeB64(encodedString);

  // Check that encoding and then decoding returns to the original string
  expect(decodedString).toBe(originalString);
});
