document.addEventListener("DOMContentLoaded", function() {
    const output = document.getElementById('output');
    const btn = document.getElementsByTagName('td');

    for (let i = 1; i < btn.length; i++) {
        btn[i].onclick = function () {
            // clearAll
            if (this.innerHTML == "C") {
                output.innerHTML = '0';
                return
            };

            //insert negative
            if (this.innerHTML == '+/-') {
                if (output.innerHTML.length == 0 || output.innerHTML[0] == '0') {
                    output.innerHTML = '-';
                    return
                };

                let x = [];
                let y = '';
                for (let i = 0; i < output.innerHTML.length; i++) {
                    if (isFinite(output.innerHTML[i])) {
                        y += output.innerHTML[i];
                    } else {
                        x.push(y, output.innerHTML[i]); y = '';
                    };
                };
                x.push(y);

                if (isFinite(x[x.length-1])) {
                    x.splice(x.length-1, 0, '-');
                } else {
                    x.splice(x.length, 0, '-');
                };

                output.innerHTML = x.join('');
                return
            };

            // answer
            if (this.innerHTML == "=") {
                //if length is 0
                if (output.innerHTML.length == 0 || output.innerHTML[0] == '=') {
                    return
                };

                //otherwise
                let ans = output.innerHTML.split('');
                for (let i = 0; i < ans.length; i++) {
                    if (ans[i] == String.fromCharCode(247)) {
                        ans[i] = ' / ';
                    } else if (ans[i] == String.fromCharCode(215)) {
                        ans[i] = ' * ';
                    } else if (ans[i] == String.fromCharCode(8722)) {
                        ans[i] = ' - ';
                    } else if (ans[i] == '-') {
                        ans[i] = ' - ';
                    };
                };
                
                
                if (isNaN(output.innerHTML.slice(-1))) {
                    ans.pop();
                    output.innerHTML = "=" + eval(ans.join(''))
                    return
                };

                output.innerHTML = "=" + eval(ans.join(''));
                return
            };

            // backspace
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
                || this.innerHTML == String.fromCharCode(8722)
                || this.innerHTML == "+") {
                    if (output.innerHTML.length == 0) {
                        return
                    };

                    if (isNaN(output.innerHTML.slice(-1))) {
                        let x = output.innerHTML.split('');
                        x.pop(); x.push(this.innerHTML);
                        output.innerHTML = x.join('');
                        return
                    };

                    if (output.innerHTML[0] == '=') {
                        let x = output.innerHTML.split('');
                        x.shift(); x.push(this.innerHTML);
                        output.innerHTML = x.join('');
                        return
                    };

                    if (output.innerHTML[0] == '0') {
                        let x = output.innerHTML.split('');
                        x.push(this.innerHTML); output.innerHTML = x.join('');
                        return
                    }
                };
            
            // numbers
            if (output.innerHTML[0] == '=' || output.innerHTML == '0') {
                output.innerHTML = this.innerHTML;
                return
            };

            output.appendChild(document.createTextNode(this.innerHTML));
        };
    };
});
