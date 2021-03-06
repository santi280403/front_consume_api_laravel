import React, { useState } from 'react'
import { Container, makeStyles } from '@material-ui/core'

import Form from '../../components/Form/CreateVehicle'
import axios from 'axios'

const useStyles = makeStyles(() => ({
    content: {
        width: '100%',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: {
        margin: '30px 0'
    }
}))

export default function New(props) {
    const classes = useStyles();

    const uri = process.env.REACT_APP_URI_API
    const [data, setData] = useState({
        placa: '',
        tipo_vehiculo: '',
        marca: '',
        propietario: '',
        cedula_propietario: ''
    });
    const [alert, setAlert] = useState({
        show: false,
        message: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.placa === '' || data.tipo_vehiculo === '' || data.marca === '' || data.propietario === '' || data.cedula_propietario === '') {
            setAlert({
                show: true,
                message: 'Por favor llena correctamente el formulario'
            })
            setTimeout(() => {
                setAlert({
                    show: false,
                    message: ''
                })
            }, 3500)
            return
        }
        const res = await axios.post(uri + '/api/vehiculo', data)
        if (res.statusText !== 'Created') {
            setAlert({
                show: true,
                message: res.data.placa[0]
            })
            return
        }
        props.history.push('/')

    }

    return (
        <Container maxWidth="sm" className={classes.content}>
            <div>
                {
                    alert.show ? (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {alert.message}
                        </div>
                    ) : <></>
                }
                <Form
                    handleChange={handleChange}
                    data={data}
                    handleSubmit={handleSubmit}
                />
            </div>
        </Container>
    )
}
