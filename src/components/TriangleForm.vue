<script setup>
import { ref } from 'vue'
let messages = ref([])
let counter = ref(0)
function submitHandler(data, node) {
  if (data.a === '' || data.b === '' || data.a === undefined || data.b === undefined) {
    node.setErrors(
        // Arg 1 is form-wide errors
        ['Проверьте, что все поля заполнены'],
        // Arg 2 is field-specific errors
        {
          a: 'Сторона А должна быть заполнена',
          b: 'Сторона B должна быть заполнена'
        }
    )
  }

 else if (data.a.includes('.') || data.b.includes('.') || data.c.includes('.')) {
    node.setErrors(
        // Arg 1 is form-wide errors
        ['Проверьте, что все поля заполнены'],
    )
  } else {
   const a = parseInt(data.a);
   const b = parseInt(data.b);
   const c = parseInt(data.c);
   if (a === b && b === c) {
     messages.value.push('Этот треугольник - равносторонний!');
     counter.value++
   }
   if (a === b && b!==c || a===c && a!==b || b===c && a!==b) {
     messages.value.push('Этот треугольник - равнобедренный!');
     counter.value++
   }
   console.log(messages);
  }
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
</template>

<script>

export default {
  name: "TriangleForm",
  methods: {
  }
}
</script>

<style scoped>

</style>