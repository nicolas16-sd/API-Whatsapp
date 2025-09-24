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

    contatos.contatos['whats-users'].forEach(function (user){
        message.users.push()
    })
}

module.exports = {

}