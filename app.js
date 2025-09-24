/*********************************************************************************************
 * Objetivo: Criação de endPoints referentes a Api do Whatsapp
 * Data: 24/09/2025
 * Versão: 1.0
 * Autor: Nicolas dos Santos Durão
 **********************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const contatos = require('./modulo/funcoes.js')
