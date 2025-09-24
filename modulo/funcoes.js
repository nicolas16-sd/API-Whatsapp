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

    const users = contatos.contatos['whats-users'].forEach(function (user){
        message.user.push(user)

        //Ordenando o usuário em ordem alfabética
        message.user.sort()
    })

    if(users){
        return message
    } else {
        return MESSAGE_ERRO
    }

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
        message.foto_perfil - user['profile-image']
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
        message.contatos = user.contacts.map(user => user.name)
        message.mensagens = user.contacts.map(user => user.messages)
        return message
    } else {
        return MESSAGE_ERRO
    }
}

//Listar todas as mensagens trocadas de um usuário pelo número (Usuário com outro Usuário)
const getMensagensTrocadasByNumero = function(number){
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos'}
}

console.log(getMensagemByNumero("11987876567"))

module.exports = {
    getAllDadosUsuario,
    getAllDadosByNumero,
    getContatosByNumero,
    getMensagemByNumero,
    getMensagensTrocadasByNumero
}