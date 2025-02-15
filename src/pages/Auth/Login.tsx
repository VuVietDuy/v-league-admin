import fetcher from "@/api/fetcher";
import { setToken } from "@/store/slice/token.slice";
import { loginUser } from "@/store/slice/user.slice";
import { ErrorMessage, Formik } from "formik";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values: any) => {
    console.log(values);
    fetcher.post("auth/login", values).then((res) => {
      console.log(res);
      dispatch(loginUser(res.data.data.user));
      dispatch(setToken(res.data.data.access_token));
      navigate("/");
    });
  };
  return (
    <div className="container flex flex-col items-center justify-center m-auto  h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center mx-auto">
        V-League Admin
      </h1>
      <div className="w-[500px] ">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="px-3">
                <div className="flex flex-col mb-3">
                  <label className="mb-1.5 font-semibold" htmlFor="">
                    Địa chỉ email
                  </label>
                  <input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="p-2 text-sm h-12 bg-blue-50 border-b"
                    type="email"
                  />
                  <ErrorMessage name="email" />
                </div>
                <div className="flex flex-col mb-6">
                  <label className="mb-1.5 font-semibold" htmlFor="">
                    Mật khẩu
                  </label>
                  <input
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="p-2 text-sm h-12 bg-blue-50 border-b"
                    type="password"
                  />
                  <ErrorMessage name="password" />
                </div>
                <div className="flex flex-col">
                  <button
                    type="submit"
                    className="flex justify-center items-center p-2 font-bold text-white bg-blue-500 h-12 bg-primary"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
        <p className="text-center mt-4">
          Bạn chưa có tài khoản?{" "}
          <NavLink className={"text-blue-600 "} to="/register">
            Đăng ký
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
