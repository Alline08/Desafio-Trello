describe('cadastro de board e card no trello', () => {
      
      let idNovoBoard
      let idList
      let idNovoCard

      var nameBoard = "Atividades diárias"
      const Url = 'https://api.trello.com/1/boards/?name='
      const keyToken = '&key=4136b8dcce24e2171e88870ddfe6ca87&token=ATTAcd32e7829af4bc07119250337479e5b3becd577b9cf46fe3667a457ab33f8bdb964F364F'
      
      it('Criar novo board', () => { 
                    
            cy.request({
                  method: 'POST',        
                  url: Url + nameBoard + keyToken, //usa as variáveis declaradas

            }).then((res) => {
                  expect(res.status).to.be.equal(200)//resposta da criação do board
                  idNovoBoard = res.body.id 
                  cy.log("idNovoBoard: " + idNovoBoard);               
            })
      })

      it('Buscar lista no board', () => { //pesquisa as listas de atividades no Board
            cy.request({
                  method: 'GET',        
                  url: `https://api.trello.com/1/boards/${idNovoBoard}/lists?key=4136b8dcce24e2171e88870ddfe6ca87&token=ATTAcd32e7829af4bc07119250337479e5b3becd577b9cf46fe3667a457ab33f8bdb964F364F`,
            
            }).then((res) => {
                  expect(res.status).to.be.equal(200);//resposta da busca da lista  
                  idList = res.body[0].id   
                  cy.log("idList: " + idList);                                                     
            })
      })

      it('Adicionar novo card', () => { //Adiciona um novo card no board
            cy.request({
                        method: 'POST',        
                        url: `https://api.trello.com/1/cards?idList=${idList}&key=4136b8dcce24e2171e88870ddfe6ca87&token=ATTAcd32e7829af4bc07119250337479e5b3becd577b9cf46fe3667a457ab33f8bdb964F364F`, 
                            
            }).then((res) => {
                  expect(res.status).to.be.equal(200);//resposta da criação do card 
                  idNovoCard = res.body.id 
                  cy.log("idNovoCard: " + idNovoCard);                                                  
            })
      })

      it('Excluir o card', () => { // Excluí o card
            cy.request({
                  method: 'DELETE',        
                  url: `https://api.trello.com/1/cards/${idNovoCard}?key=4136b8dcce24e2171e88870ddfe6ca87&token=ATTAcd32e7829af4bc07119250337479e5b3becd577b9cf46fe3667a457ab33f8bdb964F364F`,      
            }).then((res) => {
                  expect(res.status).to.be.equal(200);//resposta da exclusão do card
                  cy.log("idNovoCard: " + idNovoCard);
            })
      })

      it('Excluir o board', () => { // Excluí o board
            cy.request({
                  method: 'DELETE',        
                  url: `https://api.trello.com/1/boards/${idNovoBoard}?key=4136b8dcce24e2171e88870ddfe6ca87&token=ATTAcd32e7829af4bc07119250337479e5b3becd577b9cf46fe3667a457ab33f8bdb964F364F`,      
            }).then((res) => {
                  expect(res.status).to.be.equal(200);//resposta da exclusão do board
                  cy.log("idNovoBoard: " + idNovoBoard); 
            })
      })
})