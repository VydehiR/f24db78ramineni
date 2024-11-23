exports.api=function(req,res){
    res.status(200).json({
        resources:[
            {resources: 'Sculptures',verbs:['GET','POST','PUT','DELETE']}
        ]
    });
};

