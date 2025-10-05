# Onboarding App 🚀

Esta es una aplicación móvil desarrollada con [Expo](https://expo.dev) y React Native, que implementa un flujo de onboarding utilizando componentes personalizados.

## Características

- **Onboarding interactivo:** Presenta a los usuarios las principales funcionalidades de la app mediante pantallas de bienvenida.
- **Componentes reutilizables:** Los componentes de onboarding están diseñados para ser fácilmente modificables y reutilizables.
- **Soporte multiplataforma:** Funciona en Android, iOS y web.

## Instalación

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia la aplicación:

   ```bash
   npx expo start
   ```

## Componentes principales

- `OnboardingScreen`: Pantalla principal del onboarding.
- `OnboardingStep`: Componente para cada paso del onboarding.
- Otros componentes personalizados en la carpeta [`components/`](components/).

## Demostración en video

- [Video 1: Onboarding pagination](https://drive.google.com/file/d/1dIiCzxBwQRV5l9TYJ72ucLEN1CngupqO/view?usp=sharing)
- [Video 2: Onboarding carousel](https://drive.google.com/file/d/1w5jXS44IummB7ZeDi7y9e2fef0XOCn4I/view?usp=sharing)

## Estructura del proyecto

```
app/
  _layout.tsx
  index.tsx
components/
  OnboardingScreen.tsx
  OnboardingStep.tsx
assets/
  images/
```

## Personalización

Puedes modificar los textos, imágenes y pasos del onboarding editando los archivos en la carpeta [`components/`](components/).

## Contribución

¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes sugerencias, abre un issue o pull request.

## Licencia

Este proyecto está bajo la licencia MIT.

---

Desarrollado con ❤️ usando Expo y React Native.
