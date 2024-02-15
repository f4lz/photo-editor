<script lang="ts" setup>
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'

/** `canvas` элемент для отрисовки и работы с изображением */
const canvasElement: Ref<HTMLCanvasElement | undefined> = ref()

/** Контекст `canvas` */
const ctx: Ref<CanvasRenderingContext2D | undefined> = ref()

/** Фотография для обработки */
const image: HTMLImageElement = new Image()

/** Координаты мыши */
const x: Ref<Number | undefined> = ref()
const y: Ref<Number | undefined> = ref()

//TODO: изменить тип аргумента - `event`
const onChangeImg = (event: any) => {
  const e = event.target
  if (e.files) {
    const file = e.files[0]
    const imageUrl = URL.createObjectURL(file)
    image.src = imageUrl
  } else {
    image.src = e.value
  }
  onRenderImg()
}

onMounted(() => {
  ctx.value = canvasElement.value?.getContext('2d') || undefined
  onRenderImg()
})

/** Отрисовка изображения */
const onRenderImg = () => {
  image.onload = () => {
    ctx.value && canvasElement.value
      ? (ctx.value.clearRect(
          0,
          0,
          canvasElement.value.width,
          canvasElement.value.height
        ),
        ctx.value.drawImage(image, 0, 0))
      : console.error('Ошибка контекста или элемента страницы')
  }
}

//TODO: изменить тип аргумента - `event`
const showImgDetailsInfo = (event: any) => {
  x.value = event.x
  y.value = event.y
}
</script>

<template>
  <canvas
    ref="canvasElement"
    height="500"
    width="500"
    @mousemove="showImgDetailsInfo" />
  <div>X {{ x }} Y {{ y }}</div>
  <div>
    Загрузить фото
    <input type="file" @change="onChangeImg" />
    <input placeholder="Ссылка на фото" type="text" @change="onChangeImg" />
  </div>
</template>
