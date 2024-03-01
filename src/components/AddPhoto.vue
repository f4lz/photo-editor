<script lang="ts" setup>
import { useElementHover } from '@vueuse/core'
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'

/** `canvas` элемент для отрисовки и работы с изображением */
const canvasElement: Ref<HTMLCanvasElement | undefined> = ref()

/** Наведен ли курсор на `canvas`  */
const isHovered = useElementHover(canvasElement)

/** `color` элемент */
const colorElement: Ref<HTMLDivElement | undefined> = ref()

/** Контекст `canvas` */
const ctx: Ref<CanvasRenderingContext2D | undefined> = ref()

/** Координаты курсора */
const coordinates: Ref<HTMLDivElement | undefined> = ref()

/** Фотография для обработки */
const image: HTMLImageElement = new Image()

image.crossOrigin = 'Anonymous'

/** Координаты мыши */
const x: any = ref(0)
const y: any = ref(0)

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
  // window.addEventListener('scroll', hello)
  ctx.value =
    canvasElement.value?.getContext('2d', { willReadFrequently: true }) ||
    undefined
  onRenderImg()
})

/** Отрисовка изображения */
const onRenderImg = () => {
  image.onload = () => {
    if (ctx.value && canvasElement.value) {
      canvasElement.value.width = window.innerWidth
      canvasElement.value.height = window.innerHeight

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
    colorElement.value.style.top = `${event.pageY + 30}px`
    colorElement.value.style.left = `${event.pageX - 10}px`
    const pixel = ctx.value.getImageData(x.value, y.value, 1, 1)
    const data = pixel.data
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`
    colorElement.value.style.background = rgba
  }

  if (coordinates.value) {
    coordinates.value.style.top = `${event.pageY - 10}px`
    coordinates.value.style.left = `${event.pageX + 20}px`
  }
}
</script>

<template>
  <div class="grid place-items-center">
    <canvas
      ref="canvasElement"
      class="relative grow-0"
      @mousemove="showImgDetailsInfo" />

    <div
      v-show="isHovered"
      ref="coordinates"
      class="absolute bg-black/40 rounded-lg px-2 py-1 flex flex-col">
      <p class="text-sm text-white">x-{{ x }}px</p>
      <p class="text-white text-sm">y-{{ y }}px</p>
    </div>

    <div
      v-show="isHovered"
      ref="colorElement"
      class="absolute border w-6 h-6" />

    <div>
      Загрузить фото
      <input type="file" @change="onChangeImg" />
      <input placeholder="Ссылка на фото" type="text" @change="onChangeImg" />
    </div>
  </div>
</template>
