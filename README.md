# 📝 pre-onboarding-12th-1-11: Todo Project

-   프로젝트 진행 기간: 2023.08.23-2023.08.25(3일)
-   [개인 사전과제](https://github.com/Aroma-oh/wanted-pre-onboarding-frontend)였던 Todo 프로젝트를 팀 best practice로 만들어 제출하는 것이 1주차 과제입니다.
-   우선 개인 과제를 팀원에게 설명하며 best practice 방향을 설정했으며, 컨벤션을 맞춰가는 과정을 거쳤습니다.
-   그리고, 흩어져 있는 best practice를 모으기 위해서 Todo와 Auth 단위로 역할 분담을 하였고, Auth best practice를 만들게 되었습니다.
-   프로젝트 실행 방법
    ```
    $ cd pre-onboarding-12th-1-11
    $ npm install
    $ npm start
    ```

## 🎯 목표 설정하기

-   지난 개인 과제에서 느꼈던 [아쉬운 점](https://github.com/Aroma-oh/wanted-pre-onboarding-frontend#-%EC%95%84%EC%89%AC%EC%9B%80%EC%9C%BC%EB%A1%9C-%EB%82%A8%EC%9D%80-%EC%82%AC%ED%95%AD%EB%93%A4)들을 이번 과제에서 해결하면서, 코드를 리팩토링하는 것으로 목표로 잡았습니다.
-   따라서 팀 목표를 포함한 이번 과제 목적은 아래와 같습니다. 👇
    ```
    - 기준에 맞게 컴포넌트 분리하기
    - 성능 최적화하기
    - UX를 고려하여 서비스 로직 만들기
    - 프로젝트 확장성 고려하기
    - 클린코드 작성하기(유지보수 및 팀프로젝트 고려)
    ```

### 🧩 기준에 맞게 컴포넌트 분리하기

-   컴포넌트 분리가 또 다시 중구난방이 되지 않도록 하기 위해 아래의 기준을 상기하며 코드를 작성했습니다.
    ```
      Page
      * 라우팅의 단위가 될 컴포넌트이다.
      * 단순 래핑의 역할과 SEO를 위한 메타태그 설정의 역할만 한다.

      Container
      * UI 컴포넌트를 컨트롤하는 역할이다.
      * 데이터 패칭, 이벤트 처리 등의 비즈니스 로직은 컨테이너가 담당한다.

      Component
      * 순수하게 UI 로직만 가지고 있다.
      * UI 관련 상태, 이벤트 핸들링만을 처리한다. 이 외는 모두 컨테이너로부터 주입 받아야 한다.
      * 반드시 독립적으로 설계되어 재사용 가능해야 한다.
    ```
-   컴포넌트와 관련된 폴더 구조는 아래와 같습니다.
    ```
      이외 생략
      ├── components
      │   ├── Auth
      │   │   ├── AuthErrorMessage.tsx
      │   │   ├── AuthFooter.tsx
      │   │   ├── AuthInput.tsx
      │   │   └── AuthTitle.tsx
      │   └── Common
      │       ├── Button.tsx
      │       ├── Input.tsx
      │       └── index.ts
      ├── containers
      │   └── AuthContainer.tsx
      └──pages
          ├── Signin.tsx
          └── Signup.tsx
    ```
-   Auth 컴포넌트 분리를 시각화한 이미지입니다.
    ![image](https://github.com/Aroma-oh/wanted-pre-onboarding-frontend-projects/assets/115550622/0fd09224-8d1f-4ae6-95d1-d67d8c0e9fd5)
-   컴포넌트 분리를 통해 느낀 이점은, 코드 수정이 편리해진다는 점이었습니다. 시각화된 컴포넌트 분리 이미지를 보며 수정이 필요한 컴포넌트가 무엇인지 인지하고, 바로 해당 파일로 이동이 가능하여 복잡한 프로젝트일수록 컴포넌트 분리의 중요성은 높아질 것 같다고 생각했습니다.

### 🧚🏻 성능 최적화하기

-   성능 최적화를 위한 방안으로 렌더링 최적화를 목표로 했습니다. 컴포넌트 분리를 통해서 모든 상태 관리는 AuthContainer가 담당하기 때문에, 하위 컴포넌트의 리렌더링은 필연적으로 발생할 것이라고 생각했기 때문입니다. 따라서 실제로 리렌더링이 필요한 Input 외에 다른 하위 컴포넌트의 리렌더링을 방지하는 것을 목표로 했습니다.

#### 렌더링 최적화 방법

-   모든 하위 컴포넌트에 memo를 적용하여 프롭스가 변경되지 않는한 컴포넌트가 불필요하게 리렌더링 되지 않도록 했습니다.
    ```js
    // src/components/Auth/AuthErrorMessage.tsx
    export const AuthErrorMessage = memo(({ message }: { message: string }) => {
        return <S.AuthErrorMessageStyled>{message}</S.AuthErrorMessageStyled>;
    });
    ```
-   다만 기존 Button의 경우, click 이벤트가 handleSubmit 함수를 가지고 있어서 input에 따른 email, password 변경으로부터 자유롭지 못했습니다. (submit을 통한 API 요청시 email, password를 함께 보내야 했기 때문입니다.)
-   해결을 위해 React에서 제공하는 메모이제이션 훅을 사용하는 대신, handleSubmit 함수를 form 태그로 이동시켜 Button 컴포넌트를 email, password 상태로부터 분리시켰습니다.
-   리렌더링을 확인하기 위해 React Dev Tools를 이용하고자 했으나 해당 툴의 버그가 확인되어, console.info를 이용하여 디버깅을 했습니다.
-   렌더링 최적화를 진행하며 느낀점은, 불필요한 리렌더링을 잡기 위해서는 로직을 확실하게 이해하고 있는 것이 필수라고 생각 되었습니다. 리렌더링이 어떤 요인에 의해 발생하고, 어느 컴포넌트에서 잡아주어야 하며, 무지성으로 메모이제이션 방법을 사용하는 것보다 더 적합한 방법은 없을지 먼저 고민해보는 태도의 중요성을 느꼈습니다.
    (handleSubmit 함수에 우선적으로 useCallback을 적용시켜 보았으나 상태 의존이 원인이었기에, 리렌더링 방지에 실패했기 때문입니다. )

### 🫂 UX를 고려하여 서비스 로직 만들기

-   이전 개인 과제에서는 주어진 기술적 요구사항만 확인하고 넘어갔습니다. 하지만, 이후 실제로 서비스를 이용해보며 어떤 이유로 회원 가입에 실패했는지 등을 서비스가 안내해주지 않으면, 사용자는 큰 불편함을 느낀다는 것을 깨달았습니다. 이를 통해 UX를 고려한 개발의 중요성을 느꼈고, 이번 리팩토링에서는 안내 메시지와 더불어 서비스의 흐름을 생각하고 또 이용해보며 진행하게 되었습니다.
-   그 결과 발견하지 못했던 새로운 오류 또한 찾아내고 수정할 수 있었습니다. (새로운 오류는 회원가입 실패시에도 로그인 페이지로 리다이렉트 되는 문제였습니다.)

    👇 안내 메시지 관리를 위한 상수 데이터입니다.

    ```js
    // src/constants/message.ts
    export const EMAIL_VALIDATION_MSG = "'@'를 포함한 이메일을 입력해주세요.";
    export const PASSWORD_VALIDATION_MSG =
        "8자 이상의 비밀번호를 입력해주세요.";
    export const SIGININ_VALIDATION_MSG = "유효하지 않은 폼을 확인해 주세요.";
    export const SIGNUP_SUCCESS = "회원가입 성공";
    export const SIGNIN_SUCCESS = "로그인 성공";
    export const SIGNUP_FAILED = "회원가입에 실패했습니다.";
    export const SIGNIN_FAILED = "로그인에 실패했습니다.";
    ```

    👇 회원가입 실패시에 로그인 페이지로 리다이렉트 되지 않도록 catch문에 브라우저 새로고침 코드를 추가했습니다. 직접 리다이렉트를 처리하지 않은 이유는, 라우팅 및 리다이렉트 코드가 분산 관리되는 것을 우려한 결정입니다.

    ```js
    // src/apis/signApi.ts
    export const signupAPI = async (email: string, password: string) => {
        try {
            const response = await signAxios.post("/auth/signup", {
                email,
                password,
            });

            alert(SIGNUP_SUCCESS);
            return response;
        } catch {
            window.location.reload();
            alert(SIGNUP_FAILED);
        }
    };
    ```

### 🤔 프로젝트 확장성 고려하기 및 클린코드 작성하기

-   프로젝트 확장성을 위해 명확한 변수명을 사용하고, 반복될 것으로 예상되는 로직은 custom hook, util 함수로 분리하였습니다.
-   클린코드를 위해서는 최대한 간결하고 명확하게 작성하기 위해 노력했습니다.
-   사실 어떤 코드가 확장성이 좋고, 클린코드인지 아직 구분을 못하겠어서 목적이 달성되었는지는 잘 모르겠습니다.

---

## 🎊 팀 프로젝트 결과물 [(바로가기)](https://github.com/wanted-pre-onboarding-12th-11/pre-onboarding-12th-1-11)

#### 결과물 돌아보기

-   Auth를 담당한 팀원분들과 다시한번 Best Practice 도출 과정을 거치며, 하나의 코드로 통합하였습니다.
-   주요 변경 사항은, Container에서 작성되어 있던 여러 상태관리 코드를 useAuth 훅으로 분리하여 코드의 가독성을 높인 점입니다.
-   아쉬운 점은 error message 상태관리 코드는 여전히 Container에 작성되어 있으며, error message 컴포넌트가 AuthInput 하위 컴포넌트로 종속되어 있다는 점입니다.

#### 협업 과정 돌아보기

-   동료 협업으로 역할 분담이 아닌, 동일한 역할을 모두가 수행하며 최선의 코드를 도출하는 과정에서 다양한 협업의 과정을 경험할 수 있었습니다.
-   동일한 역할을 수행했기 때문에, 최선의 코드를 위한 논의 과정에서 충분한 고민을 거친 다양한 의견을 접할 수 있어 좋았습니다.
-   하지만 역할이 분담되지 않은 만큼, 각자의 코드를 통합하는데에는 많은 시간과 노력이 필요했습니다. 이 과정에서 lint, formatting과 같은 컨벤션 자동화 툴의 이점을 확실하게 느낄 수 있었습니다. 자동화 툴을 사용함으로써 절약된 시간으로 코드 퀄리티에 대한 더 많은 협의를 진행할 수 있었기 때문입니다.
    </br> [→ ESLint + Prettier + Husky로 컨벤션 자동화 설정 개인 블로깅 링크](https://velog.io/@on002way/%EC%83%9D%EC%82%B0%EC%84%B1%EC%9D%84-%EB%86%92%EC%9D%B4%EB%8A%94-%ED%98%91%EC%97%85-%EB%B0%A9%EB%B2%95)
    </br> [→ 팀 컨벤션 노션 링크](https://motley-bird-51b.notion.site/3a21f7d6905f4d84b58b50471dd45d19)
-   첫 프로젝트의 경험으로 다음 프로젝트에서는 더 효율적으로 동료 협업을 할 수 있는 방안을 충분히 고민해본 후, 개선해나가고 싶습니다.
