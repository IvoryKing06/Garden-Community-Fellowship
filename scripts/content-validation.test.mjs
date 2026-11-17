import { test } from "node:test";
import { strict as assert } from "node:assert";
import { validateIds, validateYoutube, validateImage } from "./validate-content.mjs";

test("editorial entries require unique, stable IDs", () => {
  assert.throws(() => validateIds([{ id: "a", title: "One" }, { id: "a", title: "Two" }], "entries", ["title"]), /duplicate ID/);
  assert.throws(() => validateIds([{ id: "Upper Case", title: "One" }], "entries", ["title"]), /stable lowercase slug/);
});

test("sermons must link to individual secure YouTube recordings", () => {
  assert.equal(validateYoutube("https://www.youtube.com/watch?v=123456789ab"), true);
  assert.equal(validateYoutube("https://youtu.be/123456789ab"), true);
  assert.equal(validateYoutube("https://www.youtube.com/@somechurch"), false);
  assert.equal(validateYoutube("http://www.youtube.com/watch?v=123456789ab"), false);
  assert.equal(validateYoutube("https://youtube.com.evil.test/watch?v=123456789ab"), false);
});

test("uploaded images require descriptive alt and a safe local path", () => {
  assert.throws(() => validateImage({ src: "/uploads/../secret.png", alt: "Test", width: 5, height: 5 }, "image"), /local image/);
  assert.throws(() => validateImage({ src: "/uploads/photo.png", alt: "", width: 5, height: 5 }, "image"), /nonempty string/);
});
