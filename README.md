# Translate with IA 🌐

Una aplicación web de traducción en tiempo real construida con React, TypeScript y Bootstrap que utiliza inteligencia artificial para traducir texto entre múltiples idiomas. [1](#0-0) 

## 🚀 Características

- **Traducción en tiempo real** con debounce de 500ms para optimizar las llamadas a la API [2](#0-1) 
- **Detección automática de idioma** en el texto de origen [3](#0-2) 
- **Intercambio de idiomas** con un solo clic [4](#0-3) 
- **Interfaz responsive** construida con React Bootstrap [5](#0-4) 
- **Gestión de estado** mediante patrón reducer [6](#0-5) 
- **Manejo de errores** y cancelación de peticiones [7](#0-6) 

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **React Bootstrap** para componentes UI
- **Custom Hooks** para lógica reutilizable
- **Vercel** para el backend de traducción [8](#0-7) 

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/RicardoH-0506/translate-withIA.git

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 🏗️ Arquitectura

La aplicación sigue una arquitectura basada en componentes con separación clara de responsabilidades:

- **`src/App.tsx`**: Componente principal que orquesta la aplicación [9](#0-8) 
- **`src/hooks/useStore.ts`**: Hook personalizado para gestión de estado global [10](#0-9) 
- **`src/hooks/useTranslation.ts`**: Hook para llamadas a la API de traducción [11](#0-10) 
- **`src/components/`**: Componentes reutilizables (TextArea, LanguageSelector) [12](#0-11) 

## 📝 Uso

1. Selecciona el idioma de origen (o usa detección automática)
2. Escribe o pega el texto a traducir
3. Selecciona el idioma de destino
4. La traducción aparecerá automáticamente después de 500ms

## 🔄 Estado de la Aplicación

El estado se gestiona mediante un reducer con las siguientes acciones: [13](#0-12) 

- `INTERCHANGE_LANGUAGES`: Intercambia idiomas origen y destino
- `SET_FROM_LANG`: Establece el idioma de origen
- `SET_TO_LANG`: Establece el idioma de destino
- `SET_FROM_TEXT`: Actualiza el texto a traducir
- `SET_RESULT`: Actualiza el resultado de la traducción

## 🌍 Idiomas Soportados

La aplicación soporta múltiples idiomas definidos en `src/constants.ts`, incluyendo inglés, español, alemán, francés, y más. [14](#0-13) 

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 👤 Autor

**Ricardo H**
- GitHub: [@RicardoH-0506](https://github.com/RicardoH-0506)
