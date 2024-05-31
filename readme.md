
## Fluxo do Redux:

###  Envolver o App no PROVIDER com o valor da store instanciada
*Engloba a aplicação provendo os dados.*

```js
// scr/main.jsx
import { store } from "./store";
import { Provider } from "react-redux";


<Provider store={store}>
  <App />
</Provider>

```


### Configurar a 'store' para receber os Reducers:
*É aqui onde os reducers vão ser agrupados e disponibilizados para a aplicação*

```js
// src/store.js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});


```

### Configurar os Slices e importar na store
*O Slice é o responsável  por manipular os estados dos reducers ou seja eles que vão agregar a  logica para a alteração dos estados.*

```js
//features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
});
export default cartSlice.reducer;

//store.js
import cartSlice from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});



```
### Acessar o estado global

*Depois de setadas as configurações e definido o estado inicial, basta acessar os dados com o hook que a lib fornece o 'useSelector'*

```js

//components/Navbar.js
import {useSelector} from 'react-redux'

const {amount} = useSelector ((state) => state.cart)

```

### Configurar as ações nos slices
*Depois de acessar as ações, é necessário criar funções para lidar com a execução delas no slice. Isso é feito ao criar no objeto a propriedade 'reducers', onde atribuímos o valor da chave e especificamos como ela irá manipular o estado.*

*É importante destacar que todas as alterações devem ser feitas a partir do ESTADO e não substituindo-o. Isso ocorre porque, se optarmos por substituir os valores não atribuídos ao novo objeto, eles vão alterar o estado, fazendo com que este novo estado se torne o estado inicial, e não é isso que desejamos.*

```js
//features/cart/cartSlice.js
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers:{
    clearCart: (state) => state.cartItems =[]
  }
});
```

### Aplicar as ações nos componentes
*Depois de configuradas e escritas falta aplicar as ações pro fluxo ficar completo e para aplicar, usamos  outro hook que a lib fornece, o 'useDispach', que  deve ser instanciado e atribuindo a ele o reducer a ser executado a partir de uma ação do usuário.*

```js
//components/CardItem.jsx
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, increase, decrease } from '../features/cart/cartSlice';

import { useDispatch } from 'react-redux';

... return(<article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button
          className='remove-btn'
          onClick={() => {
           dispatch(removeItem(id));
          }}
        >
          remove
        </button>
      </div>
      <div>
        <button
          className='amount-btn'
          onClick={() => {
         dispatch(increase({ id }));
          }}
        >
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button
          className='amount-btn'
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
          dispatch(decrease({ id }));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>)

```



store reúne todos os reducers importados do root-reducer >
root reúne todas as ações a serem tomadas
slice onde(qual entidade de reducer) descreve as ações


-------------------------------------------------
### Assincronismo com Redux

O Redux só trabalha com funções puras o que impede si utilizar as stores pra executar funções com *'side effects'*.

Então o time do Redux criou a funcionalidade de `midleware`, que receber uma *action*  e antes dela chegar na store, realiza a operação assíncrona e apenas o retorno dessa action é entregue à store.

Podemos escrever nossos próprios middlewares, mas o comum é usar os já prontos e o mais conhecido é `Thunk`.

Por resumo, o `Thunk` permite que um dado seja tratado de forma assíncrona até ser despachado para store.

Para utilizar esse recurso precisamos de 3 passos:
* Instalar o pacote do middleware
* Aplicar ele na store com a função `applyMiddleware` importada do Redux
* Usar ele nas actions

#### Redux Toolkit

  Uma outra forma de utilizar o Redux é através do **toolkit** reduzindo o boillerplate na escrita do código com redux e com algumas facilidades:

   * Para iniciar com esse formato, precisamos instalar os pacotes:

```shell
npm install redux react/redux @reduxjs/toolkit
```

* Realizada a instalação criamos nossa store onde serão compartilhados os estados pela aplicação:

*Vamos partir do exemplo anterior com posts e jsonplaceholder API*

```js
import { configureStore } from "@reduxjs/toolkit";
import postReducer from './features/posts/posts-slice'
const store = configureStore({
  reducer: {
    posts: postReducer
  },
});

export default store;
```

* Criado a store, vamos conectar ela com a nossa aplicação:

```jsx
//main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

***Note que desta forma, não a necessidade de conectar middlewares nem o devtools, o toolkit  já faz isto de forma padrão.***


* Criada a store, conectada a aplicação basta escrever nosso slice com as manipulações de estado iniciando pela escrita das funções:

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  post: {},
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPost: (state) => {
      state.post = {};
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
 
export const fetchPosts = createAsyncThunk(
  "posts/fetchPostsRequest",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = await response.json();
    return data;
  }
);

```

1) Neste trecho, importamos o `createSlice`  para criar nosso slice e atribuir o estado inicial.O campo `name` é usado para identificar a fatia na store.

2) Na sequencia, criamos a função que fará o fetch dos dados junto à API, para isso utilizamos o `createAsyncThunk`, que recebe o 'nome' da ação sendo despachada e uma  função com a devida ação.

3) Criada a função temos que adicionar ela no slice e fazemos isso com o '*builder*', um recurso que o toolkit fornece para lidar com assincronismo, lidando com os diferentes estados da chamada da API: **pending* ( no carregamento dos dados), *fulfilled* (quando este carregamento foi concluido) e *rejected*( quando a requisição é mal sucedida)**  e atribuímos na chave `extraReducers` com a devida alteração do estado inicial em cada um dos 3 cenário.

*código com todo o fluxo de dados utilizado na aplicação.*

```js
//posts-slice.js
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  post: {},
};


const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPost: (state) => {
      state.post = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchSinglePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSinglePost.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.post = action.payload;
        }
      )
      .addCase(
        fetchSinglePost.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const fetchPosts = createAsyncThunk(
  "posts/fetchPostsRequest",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = await response.json();
    return data;
  }
);
export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePostRequest",
  async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = await response.json();
    return data;
  }
);
export default postSlice.reducer;
export const { resetPost } = postSlice.actions;

```

## Overview:

### STORE
**A Store no Redux é responsável por armazenar o estado da aplicação. Ela contém o estado global e é o único local onde o estado pode ser alterado. Os slices representam fatias individuais do estado e são combinados na Store para formar o estado global.**

### SLICES
**Os slices no Redux representam partes do estado que são manipuladas individualmente. Eles contêm os reducers correspondentes para a manipulação do estado relacionado a essa parte específica da aplicação.**

### REDUCERS
**Os reducers no Redux são funções que especificam como o estado da aplicação é alterado em resposta a uma ação. Eles recebem o estado atual e uma ação e retornam um novo estado, representando a lógica para a alteração do estado. Cada slice pode ter seu próprio reducer para manipular seu estado de forma específica.**
