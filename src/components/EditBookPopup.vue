<template>
  <div class="product">
    <div class="product__image-container">
      <img v-if="imageUrl" :src="imageUrl" alt="Фото товара" class="product__image" />
    </div>
    <div class="product__info">
      <input type="file" @change="onFileChange" accept="image/*" ref="fileInput" class="product__upload-input" hidden />
      <button @click="triggerFileInput" class="product__upload-button">
        {{ fileName || 'Выберите изображение' }}
      </button>
      <input type="text" v-model="productName" placeholder="Введите название товара" class="product__input-title" />
      <textarea v-model="productDescription" placeholder="Введите описание товара" class="product__input-description"></textarea>
      <button class="product__button" @click="saveProduct">Сохранить изменения</button>
      <button class="product__delete-button" @click="deleteProduct">Удалить объявление</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, defineEmits  } from 'vue';
import { uploadImageToImgBB, updateBook, deleteBook } from '@/apiService';

const productName = ref('');
const productDescription = ref('');
const imageFile = ref(null);
const fileName = ref('');
const imageUrl = ref('');
const fileInput = ref(null);
const errorMessage = ref('');

const emit = defineEmits(['editBook', 'deleteBook']);

const props = defineProps({
  idUser: {
    type: Number,
    required: true,
  },
  productData: {
    type: Object,
    required: false,
    default: () => null
  }
})

watchEffect(() => {
  if (props.productData) {
    // Если переданы данные для редактирования, заполняем поля
    productName.value = props.productData.name || '';
    productDescription.value = props.productData.description || '';
    imageUrl.value = props.productData.preview_image || '';
    fileName.value = props.productData.preview_image ? 'Изменить изображение' : '';
  }
});

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

async function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    fileName.value = file.name;
    imageUrl.value = await uploadImageToImgBB(file);
    imageFile.value = file;
  }
}

async function saveProduct() {
  if (!productName.value || !productDescription.value || !fileName.value) {
    errorMessage.value = 'Заполните все поля и выберите изображение';
    return;
  }

  errorMessage.value = ''; // Очистка ошибки, если все поля заполнены

  const productData = {
    name: productName.value,
    description: productDescription.value,
    preview_image: imageUrl.value,
    id_owner: props.idUser,
  };
  
  await updateBook(props.productData.id, productData);
  emit('editBook')
}

async function deleteProduct() {
  if (confirm('Вы уверены, что хотите удалить это объявление?')) {
    await deleteBook(props.productData.id);
    emit('deleteBook');
  }
}
</script>

<style lang="scss" scoped>
$product-bg-color: #f9f9f9;
$product-border-color: #e0e0e0;
$product-title-color: #333;
$product-desc-color: #555;
$button-bg-color: #f06465;
$button-hover-bg-color: #e6434c;
$button-text-color: #fff;

.product {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  max-width: 800px;
  max-height: 400px;
  width: 100%;
  background-color: #fff;
  border: 1px solid $product-border-color;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &__info {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__input-title, &__input-description {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid $product-border-color;
    border-radius: 4px;
    font-size: 16px;
    color: $product-title-color;
  }

  &__input-description {
    resize: none;
    height: 100px;
  }

  &__button, &__delete-button {
    padding: 10px 20px;
    background-color: $button-bg-color;
    color: $button-text-color;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 10px;

    &:hover {
      background-color: $button-hover-bg-color;
    }
  }

  &__upload-button {
    padding: 10px 20px;
    background-color: #f06465;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 10px;

    &:hover {
      background-color: #e6434c;
    }
  }

  &__upload-input {
    display: none;
  }

  &__delete-button {
    background-color: #e6434c;

    &:hover {
      background-color: #c63a3a;
    }
  }

  &__image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
  }

  &__image {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
}

.error-message {
  color: #e6434c;
  font-size: 14px;
  margin-top: 10px;
}
</style>
