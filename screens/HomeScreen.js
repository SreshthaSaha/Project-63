import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            isSearchPressed: true,
            text : '',
            lexicalCategory : '',
            definition : "",
        }
    }
    getWord = (word)=>{
        var searchKeyword = word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword+ ".json"
        return fetch(url)
        .then((data)=>{
            if(data.status === 200){
                return data.json()
            }else{
                return null
            }
        })
        .then((response)=>{
            var responseObject= response
            if(responseObject){
                var wordData = responseObject.definitions[0]
                var definition = wordData.description
                var lexicalCategory = wordData.wordtype
                this.setState({
                    "word" : this.state.text,
                    "definition":definition,
                    "lexicalCategory" : lexicalCategory
                })
            }else{
                this.setState({
                    "word":this.state.text,
                    "definition" : "Not Found"
                })
            }
        })
    }
render(){
    return(   
   <View style = {styles.Container}>
       <View>
           <Text style = {{fontWeight : 'bold',fontSize : 30}}>Dictionary App</Text>
       </View>
       <View style = {styles.container}>
            <TextInput
            style = {styles.inputBox}
            placeholder = "Enter word"
            onChangeText = {text =>{
                this.setState({
                    text:text,
                    isSearchPressed: false,
                    word : "Loading...",
                    lexicalCategory : '',
                    examples : [],
                    definition : ""
                    });
            }}
            value ={this.state.text}
            />
       </View>
       <View >
            <TouchableOpacity
            style = {{borderWidth : 3 , borderRadius : 5,marginTop : 20  ,width : 100,height : 50,justifyContent : 'center',backgroundColor:'#5811ff'}}
            onPress = {()=>{
                this.setState({isSearchPressed : "true"});
                this.getWord(this.state.text)
            }}
                ><Text style = {{fontWeight : 'bold',textAlign : 'center',fontSize:20}}>Search</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text style ={{fontSize :20,fontWeight:'bold',marginTop:20}}>
                Word :
            </Text>
            <Text style ={{fontSize :20,marginTop : -28,marginLeft: 65}}>
               {this.state.text}
            </Text>
        </View>
        <View>
            <Text style ={{fontSize :20,fontWeight:'bold',marginTop:30}}>
                Type :
            </Text>
            <Text style ={{fontSize :20,marginTop : -28,marginLeft: 65}}>
                {this.state.lexicalCategory}
            </Text>
        </View>
        <View style = {{flexDirection : 'row',flexWrap : 'wrap'}}>
            <Text style ={{fontSize :20,fontWeight:'bold',marginTop:30}}>
                Definition :
            </Text>
            <Text style ={{fontSize :20,marginTop:30}}>
                {this.state.definition}
            </Text>
        </View>
        
   </View>
    );
 }
}
const styles = StyleSheet.create({
    Container : {
        flex: 1,
        alignItems: 'center',
        backgroundColor :'#00ffdd'
    },
    inputBox: {
        width: 300,
        alignSelf: 'center',
        height: 40,
        textAlign: 'center', 
        borderWidth: 4,
        marginTop  :20,
        fontSize:20
    },

})