
        function showData(data) {
            // Mostrar los objetos en el HTML
            var output = "";
            for (var i = 0; i < data.length; i++) {
                output += "<p>Name: " + data[i].name + ", Age: " + data[i].age + "</p>";
            }
            document.getElementById("1").innerHTML = output;
        }
 