src/
├── App.css
├── assets
│   └── react.svg
├── components
│   ├── assessment
│   │   ├── AssessmentProgress.tsx
│   │   ├── ComprehensionAssessment.tsx
│   │   ├── GrammarAssessment.tsx
│   │   ├── Progress.tsx
│   │   ├── PronunciationAssessment.tsx
│   │   ├── Question.tsx
│   │   ├── Recording.tsx
│   │   ├── Result.tsx
│   │   └── VocabularyAssessment.tsx
│   ├── auth
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── SocialLogin.tsx
│   ├── Footer.tsx
│   ├── layout
│   │   ├── AuthLayout.tsx
│   │   └── ProtectedLayout.tsx
│   ├── learning
│   │   ├── Exercise.tsx
│   │   ├── LearningPath.tsx
│   │   ├── LearningStep.tsx
│   │   └── Progress.tsx
│   ├── Navbar.tsx
│   ├── onboarding
│   │   └── LanguageSelector.tsx
│   └── ui
│       ├── Alert.tsx
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── LoadingSpinner.tsx
│       ├── Loading.tsx
│       ├── Modal.tsx
│       └── Select.tsx
├── config
│   └── navigation.ts
├── context
│   ├── AuthContext.ts
│   ├── LearningContext.ts
│   └── UserContext.ts
├── hooks
│   ├── useAuth.ts
│   ├── useLearning.ts
│   ├── useOnboarding.ts
│   └── useRecording.ts
├── index.css
├── lib
│   ├── api
│   │   ├── Api.ts
│   │   ├── AuthApi.ts
│   │   ├── interfaces
│   │   │   ├── IAuthApi.ts
│   │   │   ├── ILearningApi.ts
│   │   │   ├── IOnboardingApi.ts
│   │   │   └── IUserApi.ts
│   │   ├── LearningApi.ts
│   │   ├── mock
│   │   │   ├── MockAuthApi.ts
│   │   │   ├── MockLearningApi.ts
│   │   │   ├── MockOnboardingApi.ts
│   │   │   └── MockUserApi.ts
│   │   ├── MockAuthApi.ts
│   │   ├── OnboardingApi.ts
│   │   └── UserApi.ts
│   ├── constants
│   │   ├── api.ts
│   │   ├── languages.ts
│   │   └── routes.ts
│   ├── middleware
│   ├── models
│   │   ├── assessments
│   │   │   ├── AssessmentBase.ts
│   │   │   ├── ComprehensionAssessment.ts
│   │   │   ├── GrammarAssessment.ts
│   │   │   ├── PronunciationAssessment.ts
│   │   │   └── VocabularyAssessment.ts
│   │   ├── languages
│   │   │   └── LanguagePreferencesModel.ts
│   │   ├── requests
│   │   │   ├── assessments
│   │   │   │   └── AssessmentRequests.ts
│   │   │   ├── AuthRequests.ts
│   │   │   ├── LearningRequests.ts
│   │   │   ├── OnboardingRequests.ts
│   │   │   └── UserRequests.ts
│   │   └── responses
│   │       ├── assessments
│   │       │   ├── AssessmentBaseResponse.ts
│   │       │   ├── AssessmentResponseIndex.ts
│   │       │   ├── ComprehensionResponse.ts
│   │       │   ├── FinalAssessmentResponse.ts
│   │       │   ├── GrammarResponse.ts
│   │       │   ├── PronunciationResponse.ts
│   │       │   └── VocabularyResponse.ts
│   │       ├── AuthResponses.ts
│   │       ├── LearningResponses.ts
│   │       ├── OnboardingResponses.ts
│   │       ├── prompts
│   │       │   ├── ComprehensionPromptResponse.ts
│   │       │   ├── GrammarPromptResponse.ts
│   │       │   ├── PromptResponseIndex.ts
│   │       │   ├── PronunciationPromptResponse.ts
│   │       │   └── VocabularyPromptResponse.ts
│   │       └── UserResponses.ts
│   ├── providers
│   │   └── ErrorProvider.tsx
│   ├── schemas
│   ├── services
│   │   ├── abstractStorage.ts
│   │   ├── authService.ts
│   │   ├── authStorage.ts
│   │   ├── learningService.ts
│   │   ├── localForageAdapter.ts
│   │   ├── onboardingService.ts
│   │   ├── onboardingStorage.ts
│   │   ├── storageService.ts
│   │   └── userService.ts
│   ├── types
│   │   ├── assessment.ts
│   │   ├── auth.ts
│   │   ├── base.ts
│   │   ├── languages.ts
│   │   ├── learning.ts
│   │   ├── onboardingTypes.ts
│   │   └── user.ts
│   └── utils
│       ├── api.ts
│       ├── cn.ts
│       ├── formatting.ts
│       ├── storage.ts
│       └── validation.ts
├── main.tsx
├── pages
│   ├── auth
│   │   └── AuthPage.tsx
│   ├── LandingPage.tsx
│   ├── learning
│   │   └── LearningPath.tsx
│   └── onboarding
│       ├── assessment
│       │   ├── AssessmentCompletePage.tsx
│       │   ├── AssessmentIntroPage.tsx
│       │   └── AssessmentQuestionPage.tsx
│       └── OnboardingPage.tsx
├── router.tsx
├── store
│   ├── hooks.ts
│   ├── index.ts
│   ├── providers
│   │   ├── AppProvider.tsx
│   │   └── OnboardingStateProvider.tsx
│   ├── provider.tsx
│   └── slices
│       ├── authSlice.ts
│       ├── learningSlice.ts
│       ├── onboardingSlice.ts
│       └── userSlice.ts
├── types
│   ├── assessment.ts
│   ├── auth.ts
│   ├── base.ts
│   ├── languages.ts
│   ├── learning.ts
│   ├── onboardingTypes.ts
│   └── user.ts
└── vite-env.d.ts

39 directories, 131 files
