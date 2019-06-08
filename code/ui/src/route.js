export const VaultRoutes = {
    createRule: {
        path: "/create-rule/",
        child: {
            createConditions:{
                path: "/create-rule/conditions/"
            },
            createActions:{
                path: "/create-rule/actions/"
            }
        }
    },
    serverMode: {
        path: "/server/"
    }
}