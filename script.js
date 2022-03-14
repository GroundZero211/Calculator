document.addEventListener("DOMContentLoaded", function() {
    const output = document.getElementById('output');
    const btn = document.getElementsByTagName('td');
    let n = 0;

    for (let i = 1; i < btn.length; i++) {
        btn[i].onclick = function () {
            // clearAll
            if (this.innerHTML == "C") {
                output.innerHTML = '';
                return
            };

            // answer
            if (this.innerHTML == "=") {
                //if length is 0
                if (output.innerHTML.length == 0) {
                    return
                };

                //otherwise
                let ans = output.innerHTML;
                for (let i = 0; i < output.innerHTML.length; i++) {
                    if (ans[i] == String.fromCharCode(247)) {
                        ans = ans.replace(ans[i], '/');
                    } else if (ans[i] == String.fromCharCode(215)) {
                        ans = ans.replace(ans[i], '*');
                    };
                };

                if (isNaN(output.innerHTML.slice(-1))) {
                    let s = ans.split('')
                    s.pop()
                    output.innerHTML = "=" + eval(s.join(''));
                    return
                };

                output.innerHTML = "=" + eval(ans);
                return
            };

            // undo
            if (this.innerHTML == String.fromCharCode(9003)) {  
                if (output.innerHTML[0] == "=") {
                    output.innerHTML = "";
                    return
                };

                let x = output.innerHTML.split('');
                x.pop()
                output.innerHTML = x.join('');
                return
            };

            //for operators
            if (this.innerHTML == String.fromCharCode(247) 
                || this.innerHTML == String.fromCharCode(215) 
                || this.innerHTML == "+" 
                || this.innerHTML == "-") {
                    if (output.innerHTML.length == 0) {
                        return
                    };

                    if (isNaN(output.innerHTML.slice(-1))) {
                        let ls = output.innerHTML.split('');
                        ls.pop(); ls.push(this.innerHTML);
                        output.innerHTML = ls.join('');
                        return
                    };

                    if (output.innerHTML[0] == '=') {
                        let ls = output.innerHTML.split('');
                        ls.shift(); ls.push(this.innerHTML);
                        output.innerHTML = ls.join('');
                        return
                    };
                };
            
            // numbers
            output.appendChild(document.createTextNode(this.innerHTML))
            
        };
    };
});
