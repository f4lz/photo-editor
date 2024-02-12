<script lang="ts" setup>
import { Ref, onMounted, ref } from 'vue'

const canvasElement: Ref<HTMLCanvasElement | undefined> = ref()
const ctx: Ref<CanvasRenderingContext2D | undefined> = ref()

const image: HTMLImageElement = new Image()

const changeSrc = (event) => {
  const e = event.target
  if (e.files) {
    const file = e.files[0]
    const imageUrl = URL.createObjectURL(file)
    image.src = imageUrl
  } else {
    image.src = e.value
  }
  render()
}

onMounted(() => {
  ctx.value = canvasElement.value?.getContext('2d') || undefined
  render()
})

const render = () => {
  if (!ctx.value) {
    return
  }

  image.onload = () => {
    ctx.value.clearRect(
      0,
      0,
      canvasElement.value.width,
      canvasElement.value.height
    )
    ctx.value.drawImage(image, 0, 0)
  }
}
</script>

<template>
  <div>
    Загрузить фото
    <input type="file" @change="changeSrc" />
    <input type="text" placeholder="Ссылка на фото" @change="changeSrc" />
  </div>
  <div>
    <canvas ref="canvasElement" width="500" height="500"></canvas>
  </div>
</template>
