<script lang="ts" setup>
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'

/** `canvas` элемент для отрисовки и работы с изображением */
const canvasElement: Ref<HTMLCanvasElement | undefined> = ref()

/** `color` элемент */
const colorElement: Ref<HTMLDivElement | undefined> = ref()

/** Контекст `canvas` */
const ctx: Ref<CanvasRenderingContext2D | undefined> = ref()

/** Фотография для обработки */
const image: HTMLImageElement = new Image()

image.crossOrigin = 'Anonymous'

/** Координаты мыши */
const x: any = ref()
const y: any = ref()

/** Генерация фото из файла */
const generateFileToImg = (file: File) => {
  const imageUrl = URL.createObjectURL(file)
  image.src = imageUrl
}

//TODO: изменить тип аргумента - `event`
const onChangeImg = (event: any) => {
  const e = event.target
  e.files ? generateFileToImg(e.files[0]) : (image.src = e.value)
  onRenderImg()
}

onMounted(() => {
  ctx.value = canvasElement.value?.getContext('2d') || undefined
  onRenderImg()
})

/** Отрисовка изображения */
const onRenderImg = () => {
  image.onload = () => {
    if (ctx.value && canvasElement.value) {
      canvasElement.value.width = image.width
      canvasElement.value.height = image.height

      ctx.value.clearRect(
        0,
        0,
        canvasElement.value.width,
        canvasElement.value.height
      ),
        ctx.value.drawImage(
          image,
          0,
          0,
          canvasElement.value.width,
          canvasElement.value.height
        )
      return
    }
    console.error('Ошибка контекста или элемента страницы')
  }
}

//TODO: изменить тип аргумента - `event`
const showImgDetailsInfo = (event: any) => {
  x.value = event.layerX
  y.value = event.layerY

  if (colorElement.value && x.value && y.value && ctx.value) {
    const pixel = ctx.value.getImageData(x.value, y.value, 1, 1)
    const data = pixel.data
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`
    colorElement.value.style.background = rgba
    colorElement.value.textContent = rgba
  }
}
</script>

<template>
  <canvas ref="canvasElement" @mousemove="showImgDetailsInfo" />
  <div>X {{ x }} Y {{ y }}</div>
  <div ref="colorElement"></div>
  <div>
    Загрузить фото
    <input type="file" @change="onChangeImg" />
    <input placeholder="Ссылка на фото" type="text" @change="onChangeImg" />
  </div>
</template>
