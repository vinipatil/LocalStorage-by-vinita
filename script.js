document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('registrationForm')) {
        const registrationForm = document.getElementById('registrationForm');

        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const mobileNo = document.getElementById('mobileNo').value;
            const username = document.getElementById('username').value;

            const userData = {
                fullName: fullName,
                email: email,
                mobileNo: mobileNo,
                username: username
            };
            localStorage.setItem(username, JSON.stringify(userData));

            window.location.href = 'dashboard.html';
        });
    }

    if (document.getElementById('userData')) {
        const userData = document.getElementById('userData');

        window.deleteUser = function (username) {
            const row = document.querySelector(`tr[data-username="${username}"]`);
            const currentUsername = row.querySelector('.username').textContent;
        
            localStorage.removeItem(username);
            localStorage.removeItem(currentUsername);
        
            row.parentNode.removeChild(row);
        };
        

        window.updateUser = function (username) {
            const row = document.querySelector(`tr[data-username="${username}"]`);
            
            const fullNameCell = row.querySelector('.fullName');
            const emailCell = row.querySelector('.email');
            const mobileNoCell = row.querySelector('.mobileNo');
            const usernameCell = row.querySelector('.username');
        
            const fullName = fullNameCell.textContent;
            const email = emailCell.textContent;
            const mobileNo = mobileNoCell.textContent;
            const currentUsername = usernameCell.textContent;
        
            row.querySelectorAll('td').forEach((cell, i) => {
                let cellValue = cell.textContent;
        
                if (i !== 3) {
                    cell.innerHTML = `<input type="text" value="${cellValue}" class="edit-${i}">`;
                } else {
                    cell.innerHTML = `<input type="text" value="${currentUsername}" class="edit-${i}">`; 
                }
            });
        
            const actionCell = row.querySelector('.action-column');
            actionCell.innerHTML = `
                <button class="action-button save-button" onclick="saveUserData('${username}')">Save</button>
                <button class="action-button" onclick="deleteUser('${username}')">Delete</button>
            `;
        };
        

        window.saveUserData = function (username) {
            const row = document.querySelector(`tr[data-username="${username}"]`);
        
            const fullNameInput = row.querySelector('.edit-0');
            const emailInput = row.querySelector('.edit-1');
            const mobileNoInput = row.querySelector('.edit-2');
            const updatedUsernameInput = row.querySelector('.edit-3'); 
        
            const fullName = fullNameInput.value;
            const email = emailInput.value;
            const mobileNo = mobileNoInput.value;
            const updatedUsername = updatedUsernameInput.value; 
        
            const fullNameCell = row.querySelector('.fullName');
            const emailCell = row.querySelector('.email');
            const mobileNoCell = row.querySelector('.mobileNo');
            const usernameCell = row.querySelector('.username'); 
        
            fullNameCell.textContent = fullName;
            emailCell.textContent = email;
            mobileNoCell.textContent = mobileNo;
            usernameCell.textContent = updatedUsername; 
        
            const actionCell = row.querySelector('.action-column');
            actionCell.innerHTML = `
                <button class="action-button" onclick="updateUser('${updatedUsername}')">Update</button>
                <button class="action-button" onclick="deleteUser('${updatedUsername}')">Delete</button>
            `;
        
            const userData = {
                fullName: fullName,
                email: email,
                mobileNo: mobileNo,
                username: updatedUsername 
            };
            localStorage.setItem(updatedUsername, JSON.stringify(userData));
        };
        

        for (let i = 0; i < localStorage.length; i++) {
            const username = localStorage.key(i);
            const userDataStr = localStorage.getItem(username);
            const userDataObj = JSON.parse(userDataStr);
            const { fullName, email, mobileNo } = userDataObj;

            const row = userData.insertRow();
            row.dataset.username = username; 
            row.innerHTML = `
                <td class="fullName">${fullName}</td>
                <td class="email">${email}</td>
                <td class="mobileNo">${mobileNo}</td>
                <td class="username">${username}</td> <!-- Added class for username -->
                <td class="action-column">
                    <button class="action-button" onclick="updateUser('${username}')">Update</button>
                    <button class="action-button" onclick="deleteUser('${username}')">Delete</button>
                </td>
            `;
        }
    }
});
