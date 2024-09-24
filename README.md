# FoodCourt
FoodCourt는 사용자 맞춤형 샐러드 구독 서비스를 제공하는 웹 애플리케이션입니다. <br>
사용자는 다양한 재료를 선택하여 자신의 샐러드를 만들고, 레시피를 추천받으며, 구독 서비스를 통해 정기적으로 샐러드를 배송받을 수 있습니다.

## 📦 기술 스택
- Build Tools: Vite, TypeScript
- Styling: TailwindCSS, TailwindCSS Animate, tw-elements-react, autoprefixer
- State Management: Zustand
- Form Handling: React Hook Form, @hookform/resolvers, Zod
- UI Components: @headlessui/react, @heroicons/react, @radix-ui/react, lucide-react, shadcn-ui
- Firebase: Firebase, FirebaseUI
- Routing: React Router DOM
- Others: json-server, class-variance-authority, clsx

## 📋 기능
### 사용자 인증
Firebase 인증: Firebase Authentication을 사용하여 이메일/비밀번호 및 Google 로그인을 지원합니다. <br>
사용자 정보는 로컬 스토리지에 저장되어 페이지 새로 고침 시에도 유지됩니다.

### 페이지 설명
- HomePage
사용자에게 애플리케이션의 주요 기능을 소개합니다. <br>
로그인 및 회원가입 버튼을 통해 인증 페이지로 이동할 수 있습니다.
<br>
- RecipePage
다양한 레시피를 보여주며, 각 레시피는 제목, 가격, 재료, 조리 방법 등의 정보를 포함합니다.<br>
사용자는 선택한 레시피를 장바구니에 추가할 수 있습니다.
<br>
- MyRecipePage
사용자가 자신이 만든 레시피 목록을 관리할 수 있는 페이지입니다.<br>
레시피를 추가하거나 수정할 수 있습니다.
<br>
- SaladPage
구독할 수 있는 다양한 샐러드를 보여주는 페이지입니다.<br>
각 샐러드에는 '장바구니에 추가' 버튼이 있어 클릭 시 AddCartModal이 열립니다.
<br>
- MySaladPage
사용자가 자신만의 맞춤형 샐러드를 관리하는 페이지입니다.<br>
선택한 재료를 기반으로 한 샐러드를 확인하고, 수정할 수 있습니다.
<br>
- RegularItemsPage
정기적으로 배송받을 샐러드를 선택하고, 주차를 설정할 수 있는 페이지입니다.<br>
사용자는 WeekSelector를 통해 구독할 주수를 선택합니다.
<br>
- SearchPage
사용자가 입력한 검색어에 기반하여 결과를 보여주는 페이지입니다.<br>
로그인하지 않은 사용자가 장바구니에 추가하려고 할 경우 경고 메시지를 표시합니다.
<br>
- 장바구니 기능
사용자가 선택한 샐러드를 장바구니에 추가하고, 수량 조정 및 삭제 기능을 제공합니다.<br>
최종 결제 전 사용자에게 확인 메시지를 표시합니다.
