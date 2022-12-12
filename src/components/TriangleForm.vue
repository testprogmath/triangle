<script setup>
import { ref } from 'vue'
let messages = ref(new Set());
let bugs = ref (new Set());
let counter = ref(0);
function submitHandler(data, node) {
  if (!(data.a || data.b || data.c)) {
    node.setErrors(
        ['Проверьте, что все поля заполнены']
    );
    if (!messages.value.has('Все поля пустые')) counter.value++;
    messages.value.add('Все поля пустые');
  }
 else  if (data.a === '' || data.b === '' || data.a === undefined || data.b === undefined) {
    node.setErrors(
        // Arg 1 is form-wide errors
        ['Проверьте, что все поля заполнены'],
        // Arg 2 is field-specific errors
        {
          a: 'Сторона А должна быть заполнена',
          b: 'Сторона B должна быть заполнена'
        }
    );
    if (!messages.value.has('Не все поля заполнены')) counter.value++;
    messages.value.add('Не все поля заполнены');
  }

 else if (data.a.includes('.') || data.b.includes('.') || data.c.includes('.')) {
    node.setErrors(
        // Arg 1 is form-wide errors
        ['Проверьте, что все поля заполнены'],
    )
    bugs.value.add('Проблемы с дробными числами');
  } else {
   const a = parseInt(data.a);
   const b = parseInt(data.b);
   const c = parseInt(data.c);
    if (a===b &&b ===c && a===0) {
      bugs.value.add('Все нули как равносторонний треугольник');
    }
    else if (!ifTriangleExists(a,b,c)) {
      if (!messages.value.has('Треугольник не существует')) counter.value++;
      messages.value.add('Треугольник не существует');
    }
   else if (a === b && b === c) {
     if (!messages.value.has('Равносторонний треугольник')) counter.value++;
     messages.value.add('Равносторонний треугольник');
   }
   else if (a === b && b!==c || a===c && a!==b || b===c && a!==b) {
     if (!messages.value.has('Равнобедренный треугольник')) counter.value++;
     messages.value.add('Равнобедренный треугольник');
   }
   else if (isRightTriangle(a, b, c)) {
     if (!messages.value.has('Прямоугольный треугольник')) counter.value++;
     messages.value.add('Прямоугольный треугольник');
   }
   else if (isObtuseTriangle(a,b,c)) {
     if (!messages.value.has('Тупоугольный треугольник')) counter.value++;
     messages.value.add('Тупоугольный треугольник');
   }
   else if (isAcuteTriangle(a,b,c)) {
     if (!messages.value.has('Остроугольный треугольник')) counter.value++;
     messages.value.add('Остроугольный треугольник');
   }

   console.log(messages);
  }
}

function  isRightTriangle (a, b, c) {
  const con1 = (a * a) === (b * b) + (c * c);
  const con2 = (b * b) === (a * a) + (c * c);
  const con3 = (c * c) === (a * a) + (b * b);
  return con1 || con2 || con3;
}
function  isObtuseTriangle (a, b, c) {
  const con1 = (a * a) > (b * b) + (c * c);
  const con2 = (b * b) > (a * a) + (c * c);
  const con3 = (c * c) > (a * a) + (b * b);
  return con1 || con2 || con3;
}

function  isAcuteTriangle (a, b, c) {
  const con1 = (a * a) < (b * b) + (c * c);
  const con2 = (b * b) < (a * a) + (c * c);
  const con3 = (c * c) < (a * a) + (b * b);
  return con1 || con2 || con3;
}
function  ifTriangleExists (a, b, c) {
  const con1 = a < b + c;
  const con2 = b < a + c;
  const con3 = c < a + b;
  return con1 && con2 && con3;
}
</script>
<template>
  <FormKit
      type="form"
      submit-label="Проверить"
      @submit="submitHandler"
      validation-visibility="blur"
  >
    <h2>Тестирование треугольника на существование (неравенство треугольника)</h2>
    <p>Введите данные о сторонах треугольника ниже</p>
    <FormKit
        type="text"
        name="a"
        label="Сторона A"
        validation="number|between:0,1000000"
        placeholder="Сторона А"
    />
    <FormKit
        type="text"
        name="b"
        label="Сторона В"
        validation="number|between:0,1000000"
        placeholder="Сторона B"
    />
    <FormKit
        type="text"
        name="c"
        label="Сторона С"
        validation="number"
        placeholder="Сторона C"
    />
  </FormKit>

<p v-if="messages">{{messages[0]}}</p>
<p>Вы проверили {{counter}} кейсов из 12</p>
  <h2 v-if="counter!==0">Список проверенных кейсов: </h2>
  <ul>
    <li v-for="item in messages" :key="item">
    {{ item }}
  </li>
  </ul>
<br>
  <h2 v-if="bugs.size!==0">Найденные дефекты:</h2>
  <ul>
    <li v-for="item in bugs" :key="item">
      {{ item }}
    </li>
  </ul>
</template>

<script>

export default {
  name: "TriangleForm",
  methods: {

  },
}
</script>

<style scoped>

</style>