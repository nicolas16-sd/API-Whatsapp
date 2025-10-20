/*****************************************************************
 * Objetivo: Arquivos de funções para gerenciar a API de Whatsapp
 * Data: 24/09/2025
 * Versão: 1.0
 * Autor: Nicolas dos Santos Durão
 *****************************************************************/

const { request } = require('express')
const contatos = require('./contatos.js')
const { json } = require('body-parser')

const MESSAGE_ERRO = {status: false, status_code: 500, development: 'Nicolas dos Santos'}

//Listar todos os dados de um usuário independente do número
const getAllDadosUsuario = function(){
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos', users: []}

    contatos.contatos['whats-users'].forEach(user => {

        //Puxando todos os dados de "User" de forma manual 
        message.users.push({
            id: user.id,
            conta: user.account,
            apelido: user.nickname,
            comeco: user['created-since'],
            foto_perfil: user['profile-image'],
            numero: user.number,
            background: user.background,
            contatos: user.contacts.map(user => user.name)
        })
    })

    //Retornos em forEach precisam estar fora do Loop (Erro de Undefined)
    return message

    }

//Listar todos os dados das contas do usuário buscando pelo número
const getAllDadosByNumero = function(number){
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos'}

    //Criação da condição do find()
    const user = contatos.contatos['whats-users'].find(user => user.number === number)

    if(user){
        message.id = user.id
        message.conta = user.account
        message.apelido = user.nickname
        message.comeco = user['created-since']
        message.foto_perfil = user['profile-image']
        message.numero = user.number
        message.background = user.background
        return message
    } else {
        return MESSAGE_ERRO
    }
}

//Listar os contatos de um usuário buscando pelo número
const getContatosByNumero = function(number){
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos'}

    const user = contatos.contatos['whats-users'].find(user => user.number === number)

    if(user){
        message.id = user.id
        message.conta = user.account
        message.apelido = user.nickname
        message.contatos = user.contacts
        return message
    } else {
        return MESSAGE_ERRO
    }

}

//Listar todas as mensagens trocadas de um usuário por um número (Apenas um usuário)
const getMensagemByNumero = function(number){
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos'}

    const user = contatos.contatos['whats-users'].find(user => user.number === number)

    if(user){
        message.conta = user.account
        message.contatos = user.contacts
        return message
    } else {
        return MESSAGE_ERRO
    }
}

//Listar todas as mensagens trocadas de um usuário pelo número (Usuário com outro Usuário)
const getMensagensTrocadasByNumero = function(userNumber, contactNumber){
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos'}
    
    const user = contatos.contatos['whats-users'].find(user => user.number === userNumber)

    //Se o usuário requerido for correto...
    if(user){
        //Busca o usuário
        const contact = user.contacts.find(contact => contact.number === contactNumber)

        //Se o find() encontrar o contato pedido
        if(contact){
            //Criação de uma nova estrutura para retorno no terminal
            message.conversa = {
                usuario: user.account,
                usuario_numero: user.number,
                contato: contact.name,
                contato_numero: contact.number,
                mensagens: contact.messages
            }
            return message
        } else {
            return MESSAGE_ERRO
        }
    }
}

const getPalavraChave = function(userNumber, contactNumber, palavraChave) {
    let message = {
        status: true,
        status_code: 200,
        development: 'Nicolas dos Santos',
        resultados: []
    }

    // Percorrendo os usuários
    contatos.contatos['whats-users'].forEach(user => {
        if (user.number === userNumber) {
            user.contacts.forEach(contact => {
                if (contact.number === contactNumber) {
                    contact.messages.forEach(messages => {
                        if (messages.content.includes(palavraChave)) {
                            message.resultados.push(messages.content)
                        }
                    })
                }
            })
        }
    })

    // Retorno
    return message
}

module.exports = {
    getAllDadosUsuario,
    getAllDadosByNumero,
    getContatosByNumero,
    getMensagemByNumero,
    getMensagensTrocadasByNumero,
    getPalavraChave
}