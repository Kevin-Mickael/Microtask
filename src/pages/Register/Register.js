import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../../config";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState();

  const onSubmit = (data, e) => {
    setMessage({
      data: "Registration is in progress...",
    });

    fetch(`${config.baseUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        const hasError = "error" in data && data.error != null;
        setMessage({
          data: hasError ? data.error : "Registered successfully.",
        });

        !hasError && e.target.reset();
      });
  };

  return (
    <div>
      <div>
        {message && (
          <div role="alert">
            {message.data}
            <span aria-hidden="true" onClick={() => setMessage(null)}>
              &times;
            </span>
          </div>
        )}
        <fieldset>
          <legend>Registration Form</legend>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Please enter a username.",
                  },
                  minLength: {
                    value: 3,
                    message: "Username should contain at least 3 characters.",
                  },
                  maxLength: {
                    value: 30,
                    message: "Username should have a maximum of 30 characters.",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_-]{3,30}$/,
                    message:
                      "Username should contain letters, numbers, underscore, and dash only.",
                  },
                })}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter a password.",
                  },
                  minLength: {
                    value: 6,
                    message: "Password should contain at least 6 characters.",
                  },
                  maxLength: {
                    value: 128,
                    message:
                      "Password should have a maximum of 128 characters.",
                  },
                  pattern: {
                    value:
                      /^\S*(?=\S{6,128})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
                    message:
                      "Password should contain at least 1 upper case English letter, 1 lower case English letter, and 1 special character.",
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
              <button type="submit">Submit</button>
              <button>
                <Link to="/login">Cancel</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Register;
