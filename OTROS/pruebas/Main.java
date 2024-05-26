import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JavaToJavaScript {
    public static void main(String[] args) {
        // Crear un array de objetos en Java
        List<Person> people = new ArrayList<>();
        people.add(new Person("John", 25));
        people.add(new Person("Alice", 30));
        people.add(new Person("Bob", 35));

        // Convertir el array de objetos a una cadena JSON
        String json = toJson(people);

        // Imprimir el JSON
        System.out.println(json);
    }

    private static String toJson(List<Person> people) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(people);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "";
    }

    private static class Person {
        private String name;
        private int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public int getAge() {
            return age;
        }
    }
}