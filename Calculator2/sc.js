
      let numOne = "";
      let operator = "";
      let numTwo = "";
      const $operator = document.querySelector("#operator");
      const $result = document.querySelector("#result");

      const onClickNumber = (event) => {
        if (!operator) {
          numOne += event.target.textContent;
          $result.value += event.target.textContent;
          return;
        }

        if (!numTwo) {
          $result.value = "";
        }
        numTwo += event.target.textContent;
        $result.value += event.target.textContent;
      };

      document
        .querySelector("#number-0")
        .addEventListener("click", onClickNumber);
      document
        .querySelector("#number-1")
        .addEventListener("click", onClickNumber);
      document
        .querySelector("#number-2")
        .addEventListener("click", onClickNumber);
      document
        .querySelector("#number-3")
        .addEventListener("click", onClickNumber);
      document
        .querySelector("#number-4")
        .addEventListener("click", onClickNumber);
      document
        .querySelector("#number-5")
        .addEventListener("click", onClickNumber);
      document
        .querySelector("#number-6")
        .addEventListener("click", onClickNumber);
      document
        .querySelector("#number-7")
        .addEventListener("click", onClickNumber);
      document
        .querySelector("#number-8")
        .addEventListener("click", onClickNumber);
      document
        .querySelector("#number-9")
        .addEventListener("click", onClickNumber);

      const onClickOperator = (op) => () => {
        if (numOne) {
          operator = op;
          $operator.value = op;
        } else {
          alert("숫자를 먼저 입력하세요.");
        }
      };

      document
        .querySelector("#plus")
        .addEventListener("click", onClickOperator("+"));
      document
        .querySelector("#minus")
        .addEventListener("click", onClickOperator("-"));
      document
        .querySelector("#divide")
        .addEventListener("click", onClickOperator("/"));
      document
        .querySelector("#multiply")
        .addEventListener("click", onClickOperator("*"));
      document.querySelector("#calculate").addEventListener("click", () => {
        if (numTwo) {
          switch (operator) {
            case "+":
              $result.value = parseInt(numOne) + parseInt(numTwo);
              break;
            case "-":
              $result.value = numOne - numTwo;
              break;
            case "*":
              $result.value = numOne * numTwo;
              break;
            case "/":
              $result.value = numOne / numTwo;
              break;
            default:
              break;
          }
        } else {
          alert("숫자를 먼저 입력하세요.");
        }
      });
      document.querySelector("#clear").addEventListener("click", () => {
        numOne = "";
        operator = "";
        numTwo = "";
        $operator.value = "";
        $result.value = "";
      });
