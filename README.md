# Translate with IA 🌐

Una aplicación web de traducción en tiempo real construida con React, TypeScript y Bootstrap que utiliza inteligencia artificial para traducir texto entre múltiples idiomas. 

## 🚀 Características

- **Traducción en tiempo real** con debounce de 500ms para optimizar las llamadas a la API 
- **Detección automática de idioma** en el texto de origen
- **Intercambio de idiomas** con un solo clic 
- **Interfaz responsive** construida con React Bootstrap  
- **Gestión de estado** mediante patrón reducer 
- **Manejo de errores** y cancelación de peticiones 

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **React Bootstrap** para componentes UI
- **Custom Hooks** para lógica reutilizable
- **Vercel** para el backend de traducción  

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

- **`src/App.tsx`**: Componente principal que orquesta la aplicación 
- **`src/hooks/useStore.ts`**: Hook personalizado para gestión de estado global 
- **`src/hooks/useTranslation.ts`**: Hook para llamadas a la API de traducción 
- **`src/components/`**: Componentes reutilizables (TextArea, LanguageSelector)

## 📝 Uso

1. Selecciona el idioma de origen (o usa detección automática)
2. Escribe o pega el texto a traducir
3. Selecciona el idioma de destino
4. La traducción aparecerá automáticamente después de 500ms

## 🔄 Estado de la Aplicación

El estado se gestiona mediante un reducer con las siguientes acciones: [13]

- `INTERCHANGE_LANGUAGES`: Intercambia idiomas origen y destino
- `SET_FROM_LANG`: Establece el idioma de origen
- `SET_TO_LANG`: Establece el idioma de destino
- `SET_FROM_TEXT`: Actualiza el texto a traducir
- `SET_RESULT`: Actualiza el resultado de la traducción

## 🌍 Idiomas Soportados

La aplicación soporta múltiples idiomas definidos en `src/constants.ts`, incluyendo inglés, español, alemán, y más.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 👤 Autor

**Ricardo H**
- GitHub: [@RicardoH-0506](https://github.com/RicardoH-0506)
