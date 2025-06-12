diff --git a//dev/null b/map.js
index 0000000000000000000000000000000000000000..ab9f5ffe66159a49f0f7d141c5cf584d70d94395 100644
--- a//dev/null
+++ b/map.js
@@ -0,0 +1,40 @@
+// Инициализация карты
+var map = L.map('map').setView([55.751244, 37.618423], 10); // Москва по умолчанию
+L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
+    attribution: '&copy; OpenStreetMap contributors'
+}).addTo(map);
+
+var markers = [];
+
+// Загрузка данных маркеров
+fetch('markers.json')
+    .then(response => response.json())
+    .then(data => {
+        markers = data;
+        updateMarkers();
+    })
+    .catch(err => console.error('Не удалось загрузить маркеры', err));
+
+// Обновление маркеров с учётом выбранной даты
+function updateMarkers() {
+    var dateValue = document.getElementById('dateFilter').value;
+    var selected = dateValue ? new Date(dateValue) : null;
+    map.eachLayer(layer => {
+        if (layer instanceof L.Marker) {
+            map.removeLayer(layer);
+        }
+    });
+
+    markers.forEach(m => {
+        if (selected) {
+            var mDate = new Date(m.date);
+            if (mDate.toISOString().split('T')[0] !== selected.toISOString().split('T')[0]) {
+                return;
+            }
+        }
+        var marker = L.marker([m.lat, m.lng]).addTo(map);
+        if (m.popup) marker.bindPopup(m.popup);
+    });
+}
+
+document.getElementById('dateFilter').addEventListener('change', updateMarkers);
