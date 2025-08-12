# DevTinder FrontEnd

# Episode 1

- Create a `vite+react` Application.
- Remove Unnecessary code and create a `Hello World` App.
- Install `TailwindCSS`
- Install `daisyUi`
- Add `navbar` Component to `App.js` file.
- Create a seperate `NavBar.jsx` Component file and put all your `NavBar` code in `NavBar.js` instead of `App.jsx`.
- Install `react router dom`.
- Create `Browser Router > Routes > Route =/ Body > RouteChildren`
- Create an `Outlet` in your Body Component.
- Create a `Footer` Component.

# Episode 2
- Create a `/Login` Page.
- Install `axios`
- `CORS` -> Install `cors` in the backend => add middleware to with configurations:`origin,credentails:true`.
- In Frontend whenever you are making an API call using `axios` so pass `withCredentials:true`.
- Install `Redux Toolkit` ->`https://redux-toolkit.js.org/tutorials/quick-start`
- Install `react-redux + @reduxjs/toolkit` -> configureStore -> Provider -> createSlice -> Add reducer to store. 
- Add `Redux DevTools` in Browser.
- Login ans see if your data is coming properly in the store.
- NavBar should update as soon as user Logs in.
- Refactore our code to add constants file + create a Components folder and put all components in it.


# Episode 3

- You should not be able to access any other `routes` without `login`.
- If `token` is not present then `redirect` user to the `/login` page.
- Build the `Logout` Feature.
- 
