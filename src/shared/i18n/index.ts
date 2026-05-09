import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        language: 'Language',
        languages: {
          en: 'English',
          es: 'Spanish',
          ru: 'Russian',
        },
        backToSignIn: 'Back to sign in',
        retry: 'Retry',
      },
      auth: {
        welcome: {
          eyebrow: 'Place of power and spark',
          title: 'Power starts with one move.',
          description:
            'Step into Espire, the ritual space for motivation, momentum, and your next bright idea.',
          brandLine: 'A calm room for courage, clarity, and ignition.',
          secureFlow: 'Secure access',
          panelTitle: 'Open the next chapter',
          panelDescription:
            'Choose your path and continue in the secure Java authentication flow.',
          trustTitle: 'Built for focus',
          trustDescription:
            'Minimal friction, clear choices, and a gentle visual rhythm.',
          sparkTitle: 'Inside the gallery',
          sparkDescription:
            'Browse inspiration cards, keep what lands, and skip the noise.',
          featureFocus: 'Curated inspiration cards for your next move.',
          featureMomentum: 'Swipe with intent: keep the sparks, skip the noise.',
          featureClarity: 'A multilingual reset space for daily momentum.',
          highlightResetValue: '03 min',
          highlightResetLabel: 'to reset your inner compass',
          highlightLanguageValue: '3 langs',
          highlightLanguageLabel: 'English, Spanish, and Russian',
          highlightEnergyValue: '1 tap',
          highlightEnergyLabel: 'between pause and action',
        },
        fields: {
          email: 'Email',
          password: 'Password',
          firstName: 'First name',
          lastName: 'Last name',
          birthDate: 'Birth date',
          phone: 'Phone',
          accountEmail: 'Account email',
        },
        signIn: {
          title: 'Sign in',
          description:
            'Enter your credentials to start the PKCE authorization flow.',
          submit: 'Sign in',
          submitting: 'Signing in...',
          continueSession: 'Continue with existing session',
          noAccount: "Don't have an account?",
          signUp: 'Sign up',
          resetPassword: 'Reset password',
          registrationSuccess: 'Account created successfully. Please sign in.',
          unexpectedError: 'Unexpected authentication error.',
        },
        signUp: {
          title: 'Create account',
          description:
            'Register your account and then continue with PKCE sign-in.',
          submit: 'Create account',
          submitting: 'Creating account...',
          haveAccount: 'Already have an account?',
          signIn: 'Sign in',
          invalidEmail: 'Please use a valid email address.',
          failure: 'Could not sign up. Please try again.',
          passwordHint: 'At least 8 characters',
          optionalPhone: 'Optional',
        },
        resetPassword: {
          title: 'Reset password',
          description:
            'Submit your account email and we will trigger a reset request.',
          submit: 'Send reset link',
          submitting: 'Submitting...',
          rememberedPassword: 'Remembered your password?',
          ifExists: 'If your account exists, reset instructions were sent.',
          endpointUnavailable:
            'Reset endpoint is not available yet, but the screen is wired and ready.',
          failure: 'Could not request password reset.',
        },
      },
      pkce: {
        redirectingTitle: 'Redirecting to authorization',
        preparing: 'Preparing PKCE challenge...',
        failedTitle: 'PKCE start failed',
        retry: 'Retry',
      },
      callback: {
        signingInTitle: 'Signing you in',
        validating:
          'Validating authorization code and creating your session...',
        failedTitle: 'Authentication failed',
        retryFlow: 'Retry PKCE flow',
      },
      verifyEmail: {
        verifyingTitle: 'Verifying your email',
        verifyingDescription: 'Checking verification token...',
        successTitle: 'Email verified',
        successDescription:
          'Your email has been confirmed. You can sign in now.',
        failedTitle: 'Email verification failed',
        failedMessage: 'Could not verify your email. Please try again later.',
        expiredTitle: 'Verification link expired',
        expiredMessage:
          'This verification token has expired. Request a new email verification link.',
        missingToken: 'Verification token is missing in URL.',
      },
      gallery: {
        title: 'Spark gallery',
        greeting: 'Welcome back, {{name}}',
        guestName: 'friend',
        description:
          'Move through curated inspiration, keep what lands, and let the rest go.',
        currentSpark: 'Current spark',
        previous: 'Previous',
        next: 'Next',
        reactionTitle: 'Reaction',
        ritualTitle: 'Ritual cue',
        focusTitle: 'Focus line',
        deckTitle: 'Spark deck',
        like: 'Like',
        dislike: 'Dislike',
        liked: 'Saved to your spark list.',
        disliked: 'Skipped for now. Space stays open.',
        reactionIdle: 'Choose what deserves your energy.',
        signOut: 'Sign out',
        signingOut: 'Signing out...',
        accessToken: 'Access token',
        tokenNotAvailable: 'n/a',
        logoutFailed: 'Logout failed.',
        slides: {
          ignition: {
            badge: 'Morning ignition',
            title: 'Start before certainty arrives',
            quote:
              'You do not need perfect conditions. You need one honest beginning.',
            ritual: 'Open the day with one brave sentence and let it lead.',
            focus: 'Clarity before speed.',
            tagOne: 'Reset',
            tagTwo: 'Courage',
            tagThree: 'Spark',
          },
          momentum: {
            badge: 'Quiet momentum',
            title: 'Keep warmth in the work',
            quote:
              'Progress grows where attention stays warm, steady, and close to the next step.',
            ritual: 'Move the next small stone, not the whole mountain.',
            focus: 'Consistency over noise.',
            tagOne: 'Flow',
            tagTwo: 'Calm',
            tagThree: 'Discipline',
          },
          vision: {
            badge: 'Future pull',
            title: 'Let the bigger life call you forward',
            quote:
              'The future can guide the present when you let desire become direction.',
            ritual: 'Choose the path that makes you taller inside.',
            focus: 'Vision with action.',
            tagOne: 'Vision',
            tagTwo: 'Energy',
            tagThree: 'Direction',
          },
        },
      },
    },
  },
  es: {
    translation: {
      common: {
        language: 'Idioma',
        languages: {
          en: 'Ingles',
          es: 'Espanol',
          ru: 'Ruso',
        },
        backToSignIn: 'Volver a iniciar sesion',
        retry: 'Reintentar',
      },
      auth: {
        welcome: {
          eyebrow: 'Lugar de poder y chispa',
          title: 'El poder empieza con un movimiento.',
          description:
            'Entra en Espire, un espacio ritual para la motivacion, el impulso y tu proxima idea luminosa.',
          brandLine: 'Una sala tranquila para coraje, claridad e ignition.',
          secureFlow: 'Acceso seguro',
          panelTitle: 'Abre el siguiente capitulo',
          panelDescription:
            'Elige tu camino y continua en el flujo seguro de autenticacion de Java.',
          trustTitle: 'Hecho para el enfoque',
          trustDescription:
            'Poca friccion, decisiones claras y un ritmo visual suave.',
          sparkTitle: 'Dentro de la galeria',
          sparkDescription:
            'Recorre tarjetas de inspiracion, guarda lo que te sirve y deja el ruido.',
          featureFocus: 'Tarjetas de inspiracion curadas para tu siguiente paso.',
          featureMomentum: 'Desliza con intencion: guarda la chispa y suelta el ruido.',
          featureClarity: 'Un espacio multilenguaje para reiniciar el impulso diario.',
          highlightResetValue: '03 min',
          highlightResetLabel: 'para reiniciar tu brujula interior',
          highlightLanguageValue: '3 idiomas',
          highlightLanguageLabel: 'Ingles, Espanol y Ruso',
          highlightEnergyValue: '1 toque',
          highlightEnergyLabel: 'entre pausa y accion',
        },
        fields: {
          email: 'Correo',
          password: 'Contrasena',
          firstName: 'Nombre',
          lastName: 'Apellido',
          birthDate: 'Fecha de nacimiento',
          phone: 'Telefono',
          accountEmail: 'Correo de la cuenta',
        },
        signIn: {
          title: 'Iniciar sesion',
          description: 'Introduce tus credenciales para iniciar el flujo PKCE.',
          submit: 'Entrar',
          submitting: 'Iniciando sesion...',
          continueSession: 'Continuar con sesion existente',
          noAccount: 'No tienes cuenta?',
          signUp: 'Registrate',
          resetPassword: 'Restablecer contrasena',
          registrationSuccess: 'Cuenta creada correctamente. Inicia sesion.',
          unexpectedError: 'Error de autenticacion inesperado.',
        },
        signUp: {
          title: 'Crear cuenta',
          description: 'Registra tu cuenta y despues continua con PKCE.',
          submit: 'Crear cuenta',
          submitting: 'Creando cuenta...',
          haveAccount: 'Ya tienes cuenta?',
          signIn: 'Iniciar sesion',
          invalidEmail: 'Usa un correo valido.',
          failure: 'No se pudo registrar. Intentalo de nuevo.',
          passwordHint: 'Al menos 8 caracteres',
          optionalPhone: 'Opcional',
        },
        resetPassword: {
          title: 'Restablecer contrasena',
          description:
            'Envia el correo de tu cuenta para solicitar el restablecimiento.',
          submit: 'Enviar enlace',
          submitting: 'Enviando...',
          rememberedPassword: 'Recordaste tu contrasena?',
          ifExists: 'Si la cuenta existe, enviamos instrucciones.',
          endpointUnavailable:
            'El endpoint de reset no esta disponible aun, pero la pantalla esta lista.',
          failure: 'No se pudo solicitar el restablecimiento.',
        },
      },
      pkce: {
        redirectingTitle: 'Redirigiendo a autorizacion',
        preparing: 'Preparando PKCE...',
        failedTitle: 'Fallo al iniciar PKCE',
        retry: 'Reintentar',
      },
      callback: {
        signingInTitle: 'Iniciando tu sesion',
        validating: 'Validando codigo de autorizacion y creando sesion...',
        failedTitle: 'Autenticacion fallida',
        retryFlow: 'Reintentar flujo PKCE',
      },
      verifyEmail: {
        verifyingTitle: 'Verificando tu correo',
        verifyingDescription: 'Comprobando token de verificacion...',
        successTitle: 'Correo verificado',
        successDescription:
          'Tu correo ya esta confirmado. Ya puedes iniciar sesion.',
        failedTitle: 'Fallo la verificacion de correo',
        failedMessage:
          'No se pudo verificar tu correo. Intentalo de nuevo mas tarde.',
        expiredTitle: 'Enlace de verificacion vencido',
        expiredMessage:
          'Este token de verificacion vencio. Solicita un nuevo enlace.',
        missingToken: 'Falta el token de verificacion en la URL.',
      },
      gallery: {
        title: 'Galeria de chispas',
        greeting: 'Bienvenido otra vez, {{name}}',
        guestName: 'amigo',
        description:
          'Avanza por inspiracion curada, guarda lo que resuena y deja ir el resto.',
        currentSpark: 'Chispa actual',
        previous: 'Anterior',
        next: 'Siguiente',
        reactionTitle: 'Reaccion',
        ritualTitle: 'Ritual',
        focusTitle: 'Linea de enfoque',
        deckTitle: 'Baraja de chispas',
        like: 'Me gusta',
        dislike: 'No ahora',
        liked: 'Guardado en tu lista de chispas.',
        disliked: 'Saltado por ahora. El espacio sigue abierto.',
        reactionIdle: 'Elige lo que merece tu energia.',
        signOut: 'Cerrar sesion',
        signingOut: 'Cerrando sesion...',
        accessToken: 'Token de acceso',
        tokenNotAvailable: 'n/d',
        logoutFailed: 'Fallo al cerrar sesion.',
        slides: {
          ignition: {
            badge: 'Ignicion matinal',
            title: 'Empieza antes de que llegue la certeza',
            quote:
              'No necesitas condiciones perfectas. Necesitas un comienzo honesto.',
            ritual: 'Abre el dia con una frase valiente y deja que te guie.',
            focus: 'Claridad antes que velocidad.',
            tagOne: 'Reset',
            tagTwo: 'Coraje',
            tagThree: 'Chispa',
          },
          momentum: {
            badge: 'Impulso silencioso',
            title: 'Manten calor en el trabajo',
            quote:
              'El progreso crece donde la atencion sigue tibia, estable y cerca del siguiente paso.',
            ritual: 'Mueve la siguiente piedra pequena, no toda la montana.',
            focus: 'Constancia sobre ruido.',
            tagOne: 'Flujo',
            tagTwo: 'Calma',
            tagThree: 'Disciplina',
          },
          vision: {
            badge: 'Llamada del futuro',
            title: 'Deja que la vida grande te tire hacia delante',
            quote:
              'El futuro puede guiar el presente cuando el deseo se vuelve direccion.',
            ritual: 'Elige el camino que te haga crecer por dentro.',
            focus: 'Vision con accion.',
            tagOne: 'Vision',
            tagTwo: 'Energia',
            tagThree: 'Direccion',
          },
        },
      },
    },
  },
  ru: {
    translation: {
      common: {
        language: 'Язык',
        languages: {
          en: 'Английский',
          es: 'Испанский',
          ru: 'Русский',
        },
        backToSignIn: 'Назад ко входу',
        retry: 'Повторить',
      },
      auth: {
        welcome: {
          eyebrow: 'Место силы и искры',
          title: 'Сила начинается с одного шага.',
          description:
            'Добро пожаловать в Espire, ритуальное пространство для мотивации, импульса и вашей следующей яркой идеи.',
          brandLine: 'Спокойная комната для смелости, ясности и зажигания.',
          secureFlow: 'Безопасный доступ',
          panelTitle: 'Откройте следующую главу',
          panelDescription:
            'Выберите свой путь и продолжите в безопасном Java-потоке авторизации.',
          trustTitle: 'Создано для фокуса',
          trustDescription:
            'Минимум трения, ясные выборы и мягкий визуальный ритм.',
          sparkTitle: 'Внутри галереи',
          sparkDescription:
            'Листайте карточки вдохновения, сохраняйте то, что откликается, и отпускайте шум.',
          featureFocus: 'Подборка вдохновляющих карточек для вашего следующего шага.',
          featureMomentum: 'Листайте осознанно: сохраняйте искры и пропускайте шум.',
          featureClarity: 'Многоязычное пространство для ежедневной перезагрузки импульса.',
          highlightResetValue: '03 мин',
          highlightResetLabel: 'чтобы перенастроить внутренний компас',
          highlightLanguageValue: '3 языка',
          highlightLanguageLabel: 'Английский, Испанский и Русский',
          highlightEnergyValue: '1 тап',
          highlightEnergyLabel: 'между паузой и действием',
        },
        fields: {
          email: 'Email',
          password: 'Пароль',
          firstName: 'Имя',
          lastName: 'Фамилия',
          birthDate: 'Дата рождения',
          phone: 'Телефон',
          accountEmail: 'Email аккаунта',
        },
        signIn: {
          title: 'Вход',
          description: 'Введите данные, чтобы начать PKCE авторизацию.',
          submit: 'Войти',
          submitting: 'Вход...',
          continueSession: 'Продолжить с текущей сессией',
          noAccount: 'Нет аккаунта?',
          signUp: 'Регистрация',
          resetPassword: 'Сбросить пароль',
          registrationSuccess: 'Аккаунт создан. Войдите в систему.',
          unexpectedError: 'Неожиданная ошибка авторизации.',
        },
        signUp: {
          title: 'Регистрация',
          description: 'Создайте аккаунт, затем продолжите PKCE вход.',
          submit: 'Создать аккаунт',
          submitting: 'Создание аккаунта...',
          haveAccount: 'Уже есть аккаунт?',
          signIn: 'Вход',
          invalidEmail: 'Укажите корректный email.',
          failure: 'Не удалось зарегистрироваться. Повторите попытку.',
          passwordHint: 'Минимум 8 символов',
          optionalPhone: 'Необязательно',
        },
        resetPassword: {
          title: 'Сброс пароля',
          description: 'Отправьте email аккаунта для запроса сброса.',
          submit: 'Отправить ссылку',
          submitting: 'Отправка...',
          rememberedPassword: 'Вспомнили пароль?',
          ifExists: 'Если аккаунт существует, инструкция отправлена.',
          endpointUnavailable:
            'Эндпоинт сброса пока недоступен, но экран уже готов.',
          failure: 'Не удалось запросить сброс пароля.',
        },
      },
      pkce: {
        redirectingTitle: 'Переадресация на авторизацию',
        preparing: 'Подготовка PKCE...',
        failedTitle: 'Не удалось запустить PKCE',
        retry: 'Повторить',
      },
      callback: {
        signingInTitle: 'Выполняем вход',
        validating: 'Проверяем код и создаем сессию...',
        failedTitle: 'Ошибка авторизации',
        retryFlow: 'Повторить PKCE',
      },
      verifyEmail: {
        verifyingTitle: 'Подтверждаем email',
        verifyingDescription: 'Проверяем токен подтверждения...',
        successTitle: 'Email подтвержден',
        successDescription:
          'Ваш email успешно подтвержден. Теперь можно войти.',
        failedTitle: 'Не удалось подтвердить email',
        failedMessage: 'Не удалось подтвердить email. Попробуйте снова позже.',
        expiredTitle: 'Ссылка подтверждения истекла',
        expiredMessage:
          'Срок действия этого токена истек. Запросите новую ссылку подтверждения.',
        missingToken: 'В URL отсутствует токен подтверждения.',
      },
      gallery: {
        title: 'Галерея искр',
        greeting: 'С возвращением, {{name}}',
        guestName: 'друг',
        description:
          'Двигайтесь через подборку вдохновения, сохраняйте то, что откликается, и отпускайте остальное.',
        currentSpark: 'Текущая искра',
        previous: 'Назад',
        next: 'Дальше',
        reactionTitle: 'Реакция',
        ritualTitle: 'Ритуал',
        focusTitle: 'Линия фокуса',
        deckTitle: 'Колода искр',
        like: 'Сохранить',
        dislike: 'Пропустить',
        liked: 'Сохранено в ваш список искр.',
        disliked: 'Пока пропущено. Пространство остается открытым.',
        reactionIdle: 'Выберите то, что заслуживает вашей энергии.',
        signOut: 'Выйти',
        signingOut: 'Выход...',
        accessToken: 'Access token',
        tokenNotAvailable: 'н/д',
        logoutFailed: 'Не удалось выйти.',
        slides: {
          ignition: {
            badge: 'Утренний старт',
            title: 'Начните до того, как придет уверенность',
            quote:
              'Вам не нужны идеальные условия. Вам нужен один честный старт.',
            ritual: 'Откройте день одной смелой фразой и позвольте ей вести.',
            focus: 'Ясность важнее скорости.',
            tagOne: 'Сброс',
            tagTwo: 'Смелость',
            tagThree: 'Искра',
          },
          momentum: {
            badge: 'Тихий импульс',
            title: 'Сохраняйте тепло в работе',
            quote:
              'Прогресс растет там, где внимание остается теплым, ровным и рядом со следующим шагом.',
            ritual: 'Сдвиньте следующий маленький камень, а не всю гору.',
            focus: 'Постоянство важнее шума.',
            tagOne: 'Поток',
            tagTwo: 'Спокойствие',
            tagThree: 'Дисциплина',
          },
          vision: {
            badge: 'Притяжение будущего',
            title: 'Позвольте большой жизни тянуть вас вперед',
            quote:
              'Будущее может вести настоящее, когда желание становится направлением.',
            ritual: 'Выберите путь, который делает вас выше изнутри.',
            focus: 'Видение вместе с действием.',
            tagOne: 'Видение',
            tagTwo: 'Энергия',
            tagThree: 'Направление',
          },
        },
      },
    },
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'ru'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
      lookupLocalStorage: 'lang',
      lookupCookie: 'lang',
      cookieMinutes: 10080, // 7 days
    },
  })
  .catch((error) => {
    console.error('Failed to initialize i18n', error);
  });

export default i18n;
